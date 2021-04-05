<template>
  <div class="app-store">
    <div class="app-container" style="display: flex; flex-direction: column; width: 100%;">
      <div class="form-block">
        <el-form inline :model="form" ref="searchForm">
          <el-form-item><el-input placeholder="门店名称" v-model="form.name" /></el-form-item>
            <el-form-item>
            <el-select v-model="form.type" placeholder="门店类型">
              <el-option v-for="(item,index) in optionStatus" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch('searchForm')">查询</el-button>
            <el-button type="warning" @click="onReset('searchForm')">重置</el-button>
            <el-button type="primary" @click="onAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-block">
        <el-table v-loading='listLoading' element-loading-text='Loading' :data='list' border fit stripe size='medium' lazy :load="load" row-key="id" :tree-props='treeProps' >
          <div slot='empty'><span>暂无数据</span>&nbsp;&nbsp;<el-button type='text' @click='initTable'>初始化列表</el-button></div>
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
              <el-button type='text' @click='handlerDelete(scope.$index,scope.row)'>编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-block" style='display: flex; align-items: center; margin-top: 15px;'>
        <el-pagination :current-page='currentPage' :page-size='pageSize' :total='total'
        @size-change='handleSizeChange' @current-change='handleCurrentChange'
        layout='total, sizes, prev, pager, next, jumper'>
        </el-pagination>
        <el-button type='parimary' round size='mini'>GO</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 区域管理
import { all, ban,deleter, childrens, provinces, cities, districts } from '@/api/infrastructure/range'
import { vueDebounce } from '@/utils/index'
let tableConfig = [
  {label: 'ID', key: 'id', type: ''},
  {label: '节点', key: 'name', type: ''},
  {label: '父节点', key: 'parent_name', type: ''},
  {label: '类型', key: 'type', type: 'select'},
  {label: '城市级别', key: 'grade', type: ''},
  {label: '排序', key: 'sort', type: ''},
]
export default {
  data() {
    return {      
      /* search form */
      form: {name: '',status: ''},
      preform: [{label: '', key: '', type: '', childs: false}],
      role: [],
      formLoading: true,
      optionStatus: [{label: '禁用', value: 0},{label: '启用', value: 1}],
      optionsType: [],
      optionsProvince: [],
      optionsCity: [],
      optionsDistrict: [],
      province_id: '',
      city_id: '',
      /* table data */
      list: [],
      preList: [{label: '', key: '', type: ''}],
      treeProps: {hasChildren: 'child'},
      recursionList: [], // 递归数组
      listLoading: true,
      /* pagination */
      total: 0,
      pageSize: 20,
      currentPage: 1,
      /* flag data */
      /* other data */
      timer: 0,
    }
  },
  methods: {
    /* 搜索表单逻辑 */
    onSearch(refName) {
      // this.$refs[refName].validate((valid) => { if (valid) { }else{ })
      this.currentPage = 1; // 从第一页开始找
      var option = this.getSearchFeild()
      this.fetchDataTable(option)
    },
    onReset(refName) {
      this.$refs[refName].resetFields()
    },
    onAdd() {
      this.handlerPageChange('add')
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
    // 省
    getProvinces(name) {
      provinces({name}).then(res => {
        this.optionsProvince = res.data
      })
    },
    // 市
    getCity(province_id,name) {
      cities({province_id,name}).then(res => {
        this.optionsCity = res.data
      })
    },
    // 区
    getDistrict(city_id,name) {
      districts({city_id,name}).then(res => {
        this.optionsDistrict = res.data
      })
    },
    /* 表格逻辑 */
    initTable() {
      var option = this.initSearchFeild(this.getSearchFeild())
      this.fetchDataTable(option)
    },
    handlerEdit(index,data) {
      this.handlerPageChange('edit',data.id)
    },
    handlerDetail(index,data) {
      this.handlerPageChange('detail',data.id)
    },
    handlerMember(index,data) {
      this.$message.info('功能正在开发。。。')
    },
    handlerCopy(index,data) {
      this.$message.info('功能正在开发。。。')
    },
    handlerDelete(index,data) {
      this.$confirm(`确定要删除${data.name}吗？`,{ type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消',})
      .then(res => {
        deleter({id: data.id})
        .then(res => { this.list.splice(index,1); this.$message.success("删除成功")})
        .catch(err => this.$message.error(`删除失败${err.msg}`))
      })
      .catch(err => this.$message.info('操作已取消'))
    },
    banDebouce: vueDebounce('handlerBan'),
    handlerBan(index,data){
      var id = data.id, status = new Number(!data.status)
      ban({id,status}).then(res => {
        this.fetchDataTable(this.getSearchFeild())
        this.$notify.success({ title: '成功', message: '操作成功' })
      }).catch(err => {
        console.log('ban err',err)
        this.$notify.error({ title: '错误', message: '操作失败'})
      }).finally(()=>{
      })
    },
    // 异步加载树节点
    load(tree, treeNode, resolve) {
      this.timer = setTimeout(() => {
        childrens({parent_id: tree.id}).then(res => resolve(res.data)).catch(err => console.log(`子节点加载失败${err.msg}`))
        clearTimeout(this.timer)
      },500)
    },
    fetchDataTable(option) {
      this.listLoading = true
      all(option).then(response => {
        let _list = response.data.list
        // this.list =  this.recursionNode(_list)
        this.list = _list
        this.total = response.data.total
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
    handlerPageChange (type,id) {
      // console.log("row data:",id); 
      this.$router.push({ path: 'range/modify', query: {type: type, id: id || ''} })
    },
    getSearchFeild() {
      // 获取fetchData参数，缺什么加什么
      var {currentPage,pageSize,form} = this
      return { page: currentPage, size: pageSize, name: form.name, status: form.status }
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
    // 递归赋值是由有子节点标识
    recursionNode(arr) {
      arr.forEach(item => {
        if (item.child.length && item.child.length > 0) {
          item.hasChildren = true
          item.child.forEach(ite => ite.child.length && ite.child.length > 0 ? ite.hasChildren = true : '')
        }
      })
      return arr
    },
    pretreatForm() {
      // 预处理表单数据 暂不做
      // var items = []  // options: Array | 'function'
    },
    pretreatTable() {
      // 预处理表格数据 
      let options = { "type": {0: '',1: '省',2: '市',3: '区',length: 4} }
      tableConfig.forEach(item => {
        if(item.type === 'select') item.options = options[item.key]
      })
      return tableConfig
    },
    initComponet() {
      this.optionsType = [{label: '社区店',val: 1},{label: '商圈店',val: 2}]
      this.getProvinces()
      this.preList = this.pretreatTable()
    },
  },
  created() {
    this.initComponet()
    this.fetchDataTable(this.getSearchFeild())
  },
  mounted(){
      // console.log("index mounted:",this);
  },
  updated(){
      // console.log("index updated:",this);
  },
  beforeDestroy() {
    // console.log('index beforeDestroy');
    clearTimeout(this.timer)
  },
  destroyed() {
    // console.log("index destroyed");
  }
}
</script>
<style scoped>
</style>