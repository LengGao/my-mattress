<template>
  <div class="app-store">
    <div class="app-container" style="">
      <div class="form-block">
        <!-- <el-form inline :model='form' label-width='80px'>
          <el-form-item>
            <el-input placeholder='员工姓名' v-model='form.name'/> 
          </el-form-item>
          <el-form-item>
            <el-select placeholder='状态' v-model='form.status' clearable>
              <el-option value='1'>启用</el-option>  
              <el-option value='0'>禁用</el-option>
            </el-select> 
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='serach'>查询</el-button>
            <el-button type='primary' @click='addUser'>添加员工</el-button>
          </el-form-item>
        </el-form> -->
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
              <el-button type='text' @click='handlerEdit(scope.$index, scope.row)'>编辑</el-button>
              <el-button type='text' @click='banDebouce(scope.$index, scope.row)'>{{scope.row.status === 1 ? '禁用' : ' 启用'}}</el-button>
              <el-button type="text" @click="handlerDetail(scope.$index,scope.row)">详情</el-button>
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


  </div>
</template>

<script>
import { all, ban } from '@/api/infrastructure/store'
import { vueDebounce } from '@/utils/index'
// 门店管理
export default {
  data() {
    return {      
      /* search form */
      form: {},
      preform: [{label: '', key: '', type: '', childs: false}],
      role: [],
      formLoading: true,
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
  methods: {
    /* 搜索表单逻辑 */
    searchData() {
      this.currentPage = 1; // 从第一页开始找
      var option = this.getSearchFeild()
      this.fetchDataTable(option)
    },
    handlerAdd() {
      this.pageChange = true
      this.typeChange = 'add'
    },
    /* 表格逻辑 */
    initTable() {
      var option = this.initSearchFeild(this.getSearchFeild())
      this.fetchData(option)
    },
    handlerEdit() {
      this.pageChange = true
      this.typeChange = 'edit'
    },
    handlerDetail() {
      this.pageChange = true
      this.typeChange = 'detail'
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
    getSearchFeild() {
      // 获取fetchData参数，缺什么加什么
      // var {currentPage,pageSize,form} = this
      // var option = {page: currentPage,size: pageSize}
      var {currentPage,pageSize,form} = this
      var option = {page: currentPage,size: pageSize,name: '',start_at: '',end_at: '',province_id: '',city_id: '', district_id: ''}
      return option
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
      // 预处理表单数据
      // var items = []  // options: Array | 'function'
      // let items = [
      //   {label: '部门名称', key: '', type: ''},
      //   {label: '部们类型', key: '', type: 'select', childs: true, options: []},
      //   {label: '创建时间', key: '', type: 'select', childs: true, options: []},
      //   {label: '省', key: '', type: 'select', childs: true, options: []},
      //   {label: '市', key: '', type: 'select', childs: true, options: []},
      //   {label: '区', key: '', type: 'select', childs: true, options: []}
      // ]
      // const options = {
      //   "type": [{label: '社区店',value: '1'},{label: '商圈店',value: '2'}]
      // }
      // items.forEach(item => {
      //   if (item.type === 'select') {
      //     if (!item.options instanceof Array) {
      //         items.options().then( res => {
      //          item.options = res.data.list
      //        })
      //     } else { 
      //       item.options = options[key]
      //     }
      //   }
      // })
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
    }
    
  },
  created() {
    var option = this.getSearchFeild()
    this.fetchDataTable(option)
  },
  destroyed() {
  }
}
</script>
