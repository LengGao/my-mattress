<template>
  <div class="app-role">
    <div class="app-container">
      <div class="tree-block">
        <el-input v-model="filterText" placeholder="输入角色名搜索" clearable>
          <i class="el-icon-search el-input__icon" slot="suffix" @click="search" ></i>
        </el-input>
        <el-table :data="tree" v-loading="treeLoading" element-loading-text="Loading"
          highlight-current-row fit default-sort>
          <el-table-column sort-by="sort">
            <template v-slot='scope'><div @click="nodeClick(scope.row)">{{scope.row.name}}</div></template>
          </el-table-column>
          <el-table-column align="center" >
            <i class="el-icon-setting" @click="setting"></i>&nbsp;
            <i class="el-icon-edit-outline" @click="edit"></i>&nbsp;
            <i class="el-icon-delete-solid" @click="dele($scope.index,$scope.row)"></i>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-block">
        <div class="form-block">
          <el-form>
          </el-form>
        </div>
        <el-table :data="list" border fit stripe
          v-loading="listLoading" element-loading-text="Loading">
         <div slot='empty'><span>暂无数据</span>&nbsp;&nbsp;<el-button type='text' @click='initTable'>初始化列表</el-button></div>
          <el-table-column v-for="(item) in listLabel" :key="item.id" :label="item.label">
            <template v-slot="scope">
              {{scope.row[item.key]}}
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
  </div>
</template>

<script>  
import {createRole,deleteRole,updateRole,searchRole,getRole,getRoleList} from '@/api/infrastructure/role'
// 用户管理
export default {
  data() {
    return {
      /*--- tree data ---*/
      filterText: '',  // 过滤字符
      role_id: '', // 酒色ID
      tree: [], // 节点树
      treeLoading: true ,
      defaultProps: {
        id: "id",
        children: 'child',
        label: 'name'
      },
      /*--- search form ---*/
      form: {
        name: '', // 员工姓名
        status: ''
      },
      /*--- table data && pagination---*/
      list: [],
      listLabel: [],
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
      // this.$refs.tree.filter(val)
    }
  },
  methods: {
    /* 树控件逻辑 */
    filterNode(value, data) {
      if (!value) { this.role_id = ''; return true; }
      var res = data.name.indexOf(value) !== -1
      if (res) this.role_id = data.id
      return res
    },
    nodeClick(data,node,event) {
      this.role_id = data.id
      this.filterText = data.name
    },
    search(val){
      console.log("seacr");
    },
    setting(index,data) {
     console.log("setting");
    },
    edit(index,data,){
      console.log("edit");
      // this.pageChange = true
      // this.typeChange = 'edit'
      // this.userId = data.id
    },
    dele(index,data) {
     console.log("setting");
    },
    fetchTree() {
      this.treeLoading = true
      searchRole().then(response => {
        this.tree = response.data.list      
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
    fetchData(option) {
      this.listLoading = true
      getRoleList(option).then(response => {
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
      var {currentPage,pageSize,role_id,form} = this
      var option = {page: currentPage,size: pageSize,role_id: role_id,name: form.name,status: form.status}
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
    this.listLabel = [
      {label: 'id',key: 'id'},
      {label: '姓名',key: 'name'},
      {label: '账号',key: 'account'},
      {label: '手机号',key: 'phone'},
      {label: '部门',key: 'dept_id'},
      {label: '角色',key: 'role_name'},
      {label: '状态',key: 'status'},
      {label: '创建人',key: 'creator_name'},
      {label: '创建时间',key: 'created_at'}
    ]
  },
}
</script>

<style scoped>
.app-role {
  height: 100%;
}
.app-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.tree-block {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
}
.table-block {
  width: 100%;
  height: 100%;
}

</style>
