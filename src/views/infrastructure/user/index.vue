<template>
  <div class="app-user">
    <div class='app-container' v-show="!pageChange">
    <div class="tree-block">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" />
      <el-tree ref='tree' :data='tree' node-key='id' :props='defaultProps'
      v-loading='treeLoading' :filter-node-method='filterNode'
      class='filter-tree' default-expand-all highlight-current 
      @node-click="nodeClick" />
    </div>
    <div class='table-block'>
      <el-form inline :model='form' label-width='80px'>
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
    </el-form>
    <el-table
      v-loading='listLoading' element-loading-text='Loading' :data='list'
      border fit stripe size='medium' >
    <div slot='empty'><span>暂无数据</span>&nbsp;&nbsp;<el-button type='text' @click='initTable'>初始化列表</el-button></div>
      <el-table-column align='center' label='ID' >
        <template slot-scope='scope'>
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align='center' label='姓名'>
        <template slot-scope='scope'>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label='账号'>
        <template slot-scope='scope'>
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label='手机号' align='center'>
        <template slot-scope='scope'>
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label='部门' align='center'>
        <template slot-scope='scope'>
          {{ scope.row.dept }}
        </template>
      </el-table-column>
      <el-table-column label='角色' align='center'>
        <template slot-scope='scope'>
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column class-name='status-col' label='状态' align='center'>
        <template slot-scope='scope'>
          {{ scope.row.status === 1? '启用': '禁用' }}
        </template>
      </el-table-column>
      <el-table-column align='center' prop='created_at' label='创建人'>
        <template slot-scope='scope'>
          <span>{{ scope.row.creator_name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name='status-col' label='创建时间' align='center'>
        <template slot-scope='scope'>
            <i class='el-icon-time' /> {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column class-name='status-col' label='操作' align='center' min-width="200px">
        <template slot-scope='scope'>
          <el-button type='text' @click='() => edit(scope.$index, scope.row)'>编辑</el-button>
          <el-button type='text' @click='banDebouce(scope.$index, scope.row)'>
            {{scope.row.status === 1 ? '禁用' : ' 启用'}}
            </el-button>
          <el-button type='text' @click='() => resetPwd(scope.$index, scope.row)'>重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class='block' style='display: flex; align-items: center;'>
        <el-pagination :current-page='currentPage' :page-size='pageSize' :total='total'
        @size-change='handleSizeChange' @current-change='handleCurrentChange'
        layout='total, sizes, prev, pager, next, jumper'>
        </el-pagination>
        <el-button type='parimary' round size='mini'>go</el-button>
     </div>
    </div>
    </div>
    <add-user v-if="pageChange" :type='typeChange' :id='userId'/>
  </div>
</template>

<script>
import {allOrganization}  from '@/api/infrastructure/organization'
import {getUserList, banUser} from '@/api/infrastructure/user'
import {vueDebounce} from '@/utils/index'
import addUser from './addUser.vue'
export default {
  components: { addUser },
// 员工管理
  data() {
    return {
      /*--- tree data ---*/
      filterText: '',  // 过滤字符
      dept_id: '', // 部门ID
      tree: [], // 节点树
      treeLoading: true ,
      defaultProps: {
        id: "id",
        children: 'child',
        label: 'name'
      },
      /*--- search form ---*/
      form: {
        name: '',
        status: ''
      },
      /*--- table data && pagination---*/
      list: [],
      listLoading: true,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      /*--- flag data ---*/
      pageChange: false,
      /*--- other data ---*/
      typeChange: '',
      userId: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
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
      this.dept_id = data.id
      this.filterText = data.name
    },
    fetchTree() {
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
    serach() {
      var option = this.getSearchFeild()
      this.fetchData(option)
    },
    addUser() {
      this.pageChange = true
      this.typeChange = 'add'
    },
    /* 分页逻辑 */
    handleCurrentChange(currentPage) {
      // 改变页面
      this.currentPage = currentPage
      this.fetchData(this.getSearchFeild())
    },
    handleSizeChange(pageSize) {
      // 改变每页条目数
      this.pageSize = pageSize
      this.fetchData(this.getSearchFeild())
    },
    /* 表格逻辑 */
    initTable() {
      var option = this.initSearchFeild(this.getSearchFeild())
      this.fetchData(option)
    },
    edit(index,data,scope){
      this.pageChange = true
      this.typeChange = 'edit'
      this.userId = data.id
    },
    banDebouce: vueDebounce('ban'),
    ban(index,data){
      var id = data.id, status = new Number(!data.status)
      banUser({id,status}).then(res => {
        this.$notify.success({ title: '成功', message: '操作成功' })
        this.fetchData(this.getSearchFeild())
      }).catch(err => {
        console.log('ban err',err)
        this.$notify.error({ title: '错误', message: '操作失败'})
      }).finally(()=>{
      })
    },
    resetPwd(index,{id,status}) {

    },
    fetchData(option) {
      this.listLoading = true
      getUserList(option).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      }).catch(err => {
        throw new Error('加载失败',err)
      }).finally(() => {
        this.listLoading = false
      })
    },
    /* 公共逻辑 */
    getSearchFeild() { 
      // 条配请求字段
      var {currentPage,pageSize,dept_id,form} = this
      var option = {page: currentPage,size: pageSize,dept_id: dept_id,name: form.name,status: form.status}
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
    }
  },
  created() {
    var option = this.getSearchFeild()
    this.fetchData(option)
    this.fetchTree()
  },
  destroyed(){
    vueDebounce = null
  }
}
</script>
<style scoped>
.app-container {
  display: flex;
}
.table-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>

