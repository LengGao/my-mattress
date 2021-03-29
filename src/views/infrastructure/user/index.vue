<template>
  <div class="app-user">
    <div class="tree-block" style="margin-top: 20px;">
      <el-tag type="info" style="width: 100%; margin-bottom: 10px;">组织架构</el-tag>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree class="filter-tree" v-loading="treeLoading" :data="tree" :props="defaultProps" 
      :filter-node-method="filterNode" @check="onNodeCheck" accordion
       ref="tree" node-key="id" show-checkbox default-expand-all empty-text="暂无数据">
      </el-tree>
    </div>

    <div class="app-container" style="display: flex; flex-direction: column; width: 90%;">
      <div class="form-block">
        <el-form inline :model="form" ref="searchForm">
          <el-form-item><el-input placeholder="员工姓名" v-model="form.status" /></el-form-item>
          <el-form-item>
            <el-select v-model="form.type" placeholder="状态">
              <el-option v-for="(item,index) in optionsType" :key="index" :label="item.label" :value="item.val"></el-option>
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
        <el-table v-loading='listLoading' element-loading-text='Loading' :data='list'
          border fit stripe size='medium' >
          <div slot='empty'><span>暂无数据</span>&nbsp;&nbsp;<el-button type='text' @click='initTable'>初始化列表</el-button></div>
          <el-table-column label="ID">
            <template v-slot="scope">{{scope.row.id}}</template>
          </el-table-column>
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
              <el-button type='text' @click='handlerDetail(scope.$index,scope.row)'>详情</el-button>
              <el-button type='text' @click='handlerEdit(scope.$index,scope.row)'>编辑</el-button>
              <el-button type='text' @click='banDebouce(scope.$index,scope.row)'>{{scope.row.status === 1 ? '禁用' : ' 启用'}}</el-button>
              <el-button type="text" @click="handlerReset(scope.$index,scope.row)">重置密码</el-button>
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
  // 员工管理
import { all as allOrganization }  from '@/api/infrastructure/organization'
import { all,ban,reset } from '@/api/infrastructure//user'
import {vueDebounce} from '@/utils/index'

const tableConfig = [
  {label: '员工编号', key: 'id', type: ''},
  {label: '员工姓名', key: 'name', type: ''},
  {label: '手机号', key: 'phone', type: ''},
  {label: '账号', key: 'account', type: ''},
  {label: '部门', key: 'dept', type: 'date'},
  {label: '橘色', key: 'role_name', type: ''},
  {label: '创建人', key: 'creator_name', type: ''},
  {label: '状态', key: 'status', type: 'status'},
  {label: '创建时间', key: 'created_at', type: 'date'}
]

export default {
  data() {
    return {
      /* tree data */
      filterText: '',  // 过滤字符
      dept_id: '', // 部门ID
      tree: [], // 节点树
      treeLoading: true ,
      defaultProps: {id: "id", children: 'child', label: 'name', disabled: 'disabled'},
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
      /* other data */
      comfirmMsg: '重置后的新密码将通过短信发送至员工手机上，您确认要为该员工重置密码吗？',
      resetSuccessMsg: '密码重置成功，请告知员工用新密码登录！',
    }
  },
  watch: {
    filterText(val) {
      this.$refs['tree'].filter(val)
    },
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
    /* 树控件逻辑 */
    filterNode(value, data) {
      if (!value) { this.dept_id = ''; return true; }
      var res = data.name.indexOf(value) !== -1
      if (res) this.dept_id = data.id
      return res
    },
    nodeClick(data,node,event) {
      console.log("nodeClick",data);
    },
    onNodeCheck(current,node) {
      const check_nodes = this.$refs.tree.getCheckedNodes()
      const check_id = check_nodes.find((item) => {
       return item.id === current.id
      })
      this.dept_id = check_id || ''
      this.filterText = current.name
      console.log("onNodeCheck","current",current,"node",node,check_nodes);
    },
    fetchDataTree() {
      this.treeLoading = true
      allOrganization().then(response => {
        this.tree = response.data
      }).catch(err => {
          throw new Error('加载失败',err)
      }).finally(() => {
        this.treeLoading = false
      })
    },
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
    handlerReset(index,data) {
      this.$confirm({title: '重置密码',type: 'info',showCancelButton: true,message: this.comfirmMsg})
      .then(comfirm => { 
        reset({id: data.id})
        .then(res => this.$confirm({title: '',type: 'success',message: this.resetSuccessMsg}) )
        .catch(err => this.$message.error('重置失败'+ err)) })
      .catch(cancel =>  this.$message.info('已取消操作') )
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
    fetchDataTable(option) {
      this.listLoading = true
      all(option).then(response => {
        this.list = response.data.list
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
      console.log("row data:",id);
      this.$router.push({ path: 'user/modify', query: {type: type, id: id || ''} })
    },
    getSearchFeild() {
      // 获取fetchData参数，缺什么加什么
      var {currentPage,pageSize,form,dept_id} = this
      return {
        page: currentPage,
        size: pageSize,
        dept_id: dept_id,
        name: form.name,
        status: form.status
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
      return tableConfig
    },
    initComponet() {
      this.optionsType = [{label: '禁用',val: 0},{label: '启用',val: 1}]
      this.preList = this.pretreatTable()
    },
  },
  created() {
    this.initComponet()
    this.fetchDataTree()
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
  },
  destroyed() {
    // console.log("index destroyed");
  }
}
</script>
<style scoped>
.app-user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}
</style>

