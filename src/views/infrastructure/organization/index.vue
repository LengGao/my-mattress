<template>
  <div class="app-organization">
    <div class="app-container">
    <el-input v-model="filterText" placeholder="部门名称" style="margin-bottom: 30px;" max="100" clearable />
      <el-tree :props="defaultProps" :data="tree" ref="tree" node-key="id"  
                default-expand-all v-loading="treeLoading" empty-text="暂时没有显示数据"
                :filter-node-method="filterNode">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :style="data.disabled?'color: red;':'' ">{{ node.label }}</span>
          <span v-if="data.id === 1">
            <el-button type="text" size="small"  @click="handleAddChildDepartment(node, data)">添加子部门</el-button>
          </span>
          <span v-else>
            <el-button type="text" size="small"  @click="handlerAddSiblingDepartmen(node, data)">添加同级部门</el-button>
            <el-button type="text" size="small"  @click="handleAddChildDepartment(node, data)">添加子部门</el-button>
            <el-button type="text" size="small"  @click="handlerEdit(node, data)">编辑</el-button>
            <el-button type="text" size="small"  @click="handlerDelete(node, data)">删除</el-button>
            <el-button type="text" size="small"  @click="() => banDebouce(node, data)">{{data.disabled?'启用':'禁用'}}</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
// 组织架构
import Modify from './modify'
import{ all, ban, deleter } from '@/api/infrastructure/organization'
import {vueDebounce} from '@/utils/index'

export default {
  components: { Modify },
  data() {
    return {
      /* tree data */
      filterText: '',
      dept_id: '',
      tree: [{id: '', name: '', parent_id: '', child: [{id: '', label: '', child: [] }] }],
      treeLoading: true,
      defaultProps: {children: 'child', label: 'name', disabled: 'disabled', isLeaf: 'isLeaf'}, // 节点信息与数据的映射关系指定，id如果没有指定则默认为Id，一次类推
      /* flag data */
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
    nodeClick(node, data) {
      console.log("nodeClick", node, data);
    },
    handleAddChildDepartment(node, data) {
      console.log('添加子部门:', node, data)
      this.$router.push({ path: 'organization/modify', query: { type: 'addChild', id: data.id || ''} })
    },
    handlerAddSiblingDepartmen(node, data) {
      console.log('添加同级部门:', node, data)
      this.$router.push({ path: 'organization/modify', query: { type: 'addSibling', id: data.id || ''} })
    },
    handlerEdit(node, data) {
      console.log('编辑:', node, data)
      this.$router.push({ path: 'organization/modify', query: { type: 'edit', id: data.id || ''} })
    },
    handlerDelete(node, data) {
      console.log('删除:', node, data)  
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      this.$confirm('此操作将永久删除该部门以及子部门, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消',type: 'warning'})
      .then(() => {
        children.splice(index, 1);
        deleter({id: data.id}).then(res => this.$message.success('删除成功!'))
        .catch(err => this.$message.error(`删除失败!，失败原因:${err.msg}`))        
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'})         
      })
    },
    banDebouce: vueDebounce("handlerBan"),
    handlerBan(node, data){
      console.log('禁用:',node, data)
      var id = data.id, status = new Number(!data.id)
      ban({id,status}).then(res => {
        this.fetchDataTable(this.getSearchFeild())
        this.$notify.success({ title: '成功', message: '操作成功' })
      }).catch(err => {
        console.log('ban err',err)
        this.$notify.error({ title: '错误', message: '操作失败'})
      }).finally(()=>{
      })
    },
    fetchDataTree() {
      this.treeLoading = true
      all().then(response => {
        this.tree = response.data      
      }).catch(err => {
          throw new Error('加载失败',err)
      }).finally(() => {
        this.treeLoading = false
      })
    }
  },
  created() {
    this.fetchDataTree()
  }
}
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #B3C0D1;  
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .form {
    padding: 30px;
  }
</style>
