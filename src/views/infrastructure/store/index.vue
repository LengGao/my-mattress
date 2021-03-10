<template>
  <div class="app-store">
    <div class="app-container" v-show="!pageChange" style="display: flex; flex-direction: column; width: 100%;">
      <div class="form-block">
        <el-form inline :model="form" >
          <el-form-item><el-input placeholder="门店名称" v-model="form.name" /></el-form-item>
            <el-form-item>
            <el-select v-model="form.type" placeholder="门店类型">
              <div v-if="optionsType.length > 0"><el-option v-for="(item,index) in optionsType" :key="index" :label="item.label" :value="item.val"></el-option></div>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-time-picker placeholder="创建时间" v-model="form.start_at"></el-time-picker>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="省" v-model.number="form.province_id" @change="handlerRegion('省',form.province_id)" clearable>
             <el-option v-for="(item,index) in optionsProvince" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="省" v-model.number="form.city_id" @change="handlerRegion('市',form.city_id)" clearable>
              <el-option v-for="(item,index) in optionsCity" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="区" v-model.number="form.district_id" @change="handlerRegion('区',form.district_id)" clearable>
              <el-option v-for="(item,index) in optionsDistrict" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="primary" @click="handlerAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-block">
        <el-table v-loading='listLoading' element-loading-text='Loading' :data='list'
          border fit stripe size='medium' >
          <div slot='empty'><span>暂无数据</span>&nbsp;&nbsp;<el-button type='text' @click='initTable'>初始化列表</el-button></div>
          <!-- <el-table-column label="ID">
            <template v-slot="scope">{{scope.row.id}}</template>
          </el-table-column> -->
          <el-table-column v-for="item in preList" :key="item.id" :label="item.label"  width="140" align="center">
            <template v-if="item.type === 'status'" v-slot="scope">
              {{scope.row.status === 0 ? '禁用' : '启用' }}
            </template>
            <template v-else-if="item.type === 'select'" v-slot="scope" >
              {{ item.options[scope.row[item.key]] }}
            </template>
            <template v-else v-slot="scope">
              {{scope.row[item.key]}}
            </template>
          </el-table-column>
          <el-table-column label='操作' align='center' min-width="200px">
            <template slot-scope='scope'>
              <el-button type='text' @click='handlerEdit(scope.$index,scope.row)'>编辑</el-button>
              <el-button type='text' @click='banDebouce(scope.$index,scope.row)'>{{scope.row.status === 1 ? '禁用' : ' 启用'}}</el-button>
              <el-button type="text" @click="handlerMember(scope.$index,scope.row)">查看会员</el-button>
              <el-button type="text" @click="handlerDetail(scope.$index,scope.row)">查看订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-block" style='display: flex; align-items: center;'>
        <el-pagination :current-page='currentPage' :page-size='pageSize' :total='total'
        @size-change='handleSizeChange' @current-change='handleCurrentChange'
        layout='total, sizes, prev, pager, next, jumper'>
        </el-pagination>
        <el-button type='parimary' round size='mini'>go</el-button>
      </div>
    </div>

    <modify v-show="pageChange" mtitle="'订单'" :type='typeChange' @close="handlerPageChange" > </modify>
  </div>
</template>

<script>
import { all,ban } from '@/api/infrastructure/store'
import { provinces,cities,districts} from '@/api/infrastructure/range'
import { vueDebounce } from '@/utils/index'
import Modify from './modify'
// 门店管理
export default {
  components: {Modify},
  data() {
    return {      
      /* search form */
      form: {name: '',type:'',start_at:'',province_id:'',city_id:'',district_id:''},
      preform: [{label: '', key: '', type: '', childs: false}],
      role: [],
      formLoading: true,
      optionsType: [],
      optionsProvince: [],
      optionsCity: [],
      optionsDistrict: [],
      province_id: '',
      city_id: '',
      /* table data */
      list: [],
      preList: [{label: '', key: '', type: ''}],
      listLoading: true,
      /* pagination */
      total: 0,
      pageSize: 20,
      currentPage: 1,
      /* flag data */
      pageChange: false,
      /* other data */
      typeChange: '',
    }
  },
  watch: {
    province_id: function (newVal) {
      console.log("province_id",newVal);
      if (newVal) { this.getCity(newVal) }
    },
    city_id: function(newVal) {
      console.log("city_id",newVal);
      if (newVal) { this.getDistrict(this.city_id) }
    }
  },
  methods: {
    /* 搜索表单逻辑 */
    searchData() {
      this.currentPage = 1; // 从第一页开始找
      var option = this.getSearchFeild()
      this.fetchDataTable(option)
    },
    handlerAdd() {
      this.handlerPageChange(true,'add')
    },
    handlerRegion(type,region_id) {
      console.log("type",type,region_id);
      switch(type) {
        case '省': 
          this.province_id = region_id; 
          if(!region_id) { this.optionsCity = [],this.optionsDistrict = [],this.form.province_id = '',this.form.city_id = '',this.form.district_id = '' }
        break;
        case '市': 
          this.city_id = region_id;
          if (!this.province_id) { this.$message.error('请先选择省') } 
          if (!region_id) { this.optionsDistrict = [],this.form.city_id = '',this.form.district_id = '' }
        break;
        case '区': 
          if (!region_id) { this.form.district_id = '' }
          if (!this.province_id || !this.city_id) { this.$message.error('请先选择省/市') } 
        break;
      }
    },
    getProvinces(name) {
      provinces({name}).then(res => {
        this.optionsProvince = res.data
      })
    },
    getCity(province_id,name) {
      cities({province_id,name}).then(res => {
        this.optionsCity = res.data
      })
    },
    getDistrict(city_id,name) {
      districts({city_id,name}).then(res => {
        this.optionsDistrict = res.data
      })
    },
    /* 表格逻辑 */
    initTable() {
      var option = this.initSearchFeild(this.getSearchFeild())
      this.fetchData(option)
    },
    handlerEdit(index,data) {
      this.handlerPageChange(true,'edit')
      this.$message.info('功能正在开发。。。')
    },
    handlerDetail(index,data) {
      this.handlerPageChange(true,'detail')
      this.$message.info('功能正在开发。。。')
    },
    handlerMember(index,data) {
      this.$message.info('功能正在开发。。。')
    },
    handlerCopy(index,data) {
      this.$message.info('功能正在开发。。。')
    },
    banDebouce: vueDebounce('handlerBan'),
    handlerBan(index,data){
      var id = data.id, status = new Number(!data.status)
      ban({id,status}).then(res => {
        this.$notify.success({ title: '成功', message: '操作成功' })
        this.fetchData(this.getSearchFeild())
      }).catch(err => {
        console.log('ban err',err)
        this.$notify.error({ title: '错误', message: '操作失败'})
      }).finally(()=>{
      })
    },
    fetchDataTable(option) {
      this.listLoading = true
      all(option).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.preList = this.pretreatTable()
        console.log(this.preList);
      }).catch(err => {
        throw new Error('表格加载失败',err)
      }).finally(() => {
        this.listLoading = false
      })
    },
    /* 分页逻辑 */
    handleCurrentChange(currentPage) {
      // 改变页面
      this.currentPage = currentPage
      this.fetchDataTable(this.getSearchFeild())
    },
    handleSizeChange(pageSize) {
      // 改变每页条目数
      this.pageSize = pageSize
      this.fetchDataTable(this.getSearchFeild())
    },
    /* 公共逻辑 */
    handlerPageChange (event,type) {
      this.pageChange = event
      this.typeChange = type
    },
    getSearchFeild() {
      // 获取fetchData参数，缺什么加什么
      // var {currentPage,pageSize,form} = this
      // var option = {page: currentPage,size: pageSize}
      var {currentPage,pageSize,form} = this
      return {
        page: currentPage,
        size: pageSize,
        name: form.name,
        type: form.type,
        start_at: form.start_at ,
        province_id: form.province_id,
        city_id: form.city_id, 
        district_id: form.district_id
      }
    },
    initSearchFeild(data){
      // 初始化请求参数
      for(var key in data ) {
        if (key === 'page' || key === 'size') {
          data[key] = key==='page' ? 1 : 20
        } else if (typeof data[key] === 'object' && data[key] instanceof Array) {
          data[key] = []
        } else if (typeof data[key] === 'object') {
            data[key] = {}
        } else {
          data[key] = ''
        }
      }
      return data
    },
    pretreatForm() {
      // 预处理表单数据 暂不做
      // var items = []  // options: Array | 'function'
    },
    pretreatTable() {
      // 预处理表格数据 
      // var items = []
      let items = [
        {label: '门店编码', key: 'id', type: ''},
        {label: '门店全称', key: 'name', type: ''},
        {label: '门店简称', key: 'short_name', type: ''},
        {label: '门店类型', key: 'type', type: 'select'},
        {label: '筹备日期', key: 'prepare_date', type: 'date'},
        {label: '开业日期', key: 'open_date', type: 'date'},
        {label: '结业日期', key: 'finish_date', type: 'date'},
        {label: '状态', key: 'status', type: 'status'},
        {label: '创建人', key: 'creator_name', type: ''},
        {label: '创建时间', key: 'created_at', type: 'date'}
      ]
      let options = {
        "type": {0: '',1: '社区店',2: '商圈店',length: 3},
        "property": {0: '',1: '直营',2: '加盟',3: '合作',length: 4}
      }
      items.forEach(item => {
        if(item.type === 'select') item.options = options[item.key]
      })
      return items
    },
    initComponet() {
      this.optionsType = [{label: '社区店',val: 1},{label: '商圈店',val: 2}]
      this.getProvinces()
    }
  },
  created() {
    this.initComponet()
    this.fetchDataTable(this.getSearchFeild())
  },
  destroyed() {
  }
}
</script>
<style scoped>
</style>