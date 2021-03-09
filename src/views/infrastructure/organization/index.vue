<template>
  <div class="vorganization">
    <div class="custom-tree-container" v-show="!showDialog">
    <el-input v-model="filterText" placeholder="部门名称" style="margin-bottom:30px;" max="100" clearable />
        <el-tree :props="props" :data="treedata" node-key="id" 
                  ref="tree" empty-text="暂时没有显示数据" default-expand-all
                  :filter-node-method="filterNode">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :style="data.disabled?'color: red;':''">{{ node.label }}</span>
            <span>
              <el-button type="text" size="small"  @click="appendChild(data)">添加子部门</el-button>
              <el-button type="text" size="small"  @click="appendSiblings(data)">添加同级部门</el-button>
              <el-button type="text" size="small"  @click="updateNode(data)">编辑</el-button>
              <el-button type="text" size="small"  @click="removeNode(data)">删除</el-button>
              <el-button type="text" size="small"  @click="() => disableNode(data)">{{data.disabled?'启用':'禁用'}}</el-button>
            </span>
          </span>
        </el-tree>
    </div>
    <div v-show="showDialog" >
     <el-header>
       {{header}} 
       <i @click="ctrlDialog('')" class="el-icon-circle-close" style="font-size: 28px;"></i>
     </el-header>
    <el-form ref="form" :model="form" label-width="120px" label-position="left" class="form">
        <el-form-item label="组织名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="父级组织">
          <el-input v-model="form.region" />
        </el-form-item>
        <el-form-item label="组织类型">
          <el-select v-model="form.date2">
            <el-option value="1"> 组织类型1</el-option>
            <el-option value="2"> 组织类型2</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.resource" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input disabled v-model="form.desc" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input disabled v-bind:value="form.createDate || createDate()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >确定</el-button>
          <el-button type="warning" @click="ctrlDialog('')">取消</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
// 组织架构
var debounce = function (handle,fn, wait) {
  var timeout;
  return function (data) {
      var repeat = handle.call(this, data)
                  console.log("debounce",repeat);
      if (repeat) {
          clearTimeout(timeout)
      }
          timeout = setTimeout(function () {
          fn.call(this, data)
          },wait)
  } 
}

import { formatTime, parseTime } from "@/utils/index";
export default {

  data() {
    return {
      filterText: '',
      treedata: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 5,
          label: '二级 1-1',
          children: [{
            id: 3,
            label: '三级 1-1-1',
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      },{
        id: 2,
        label: '二级 2',
        children: [{
          id: 6,
          label: '二级 1-1',
          children: [{
            id: 7,
            label: '三级 1-1-1',
            disabled: true,
          }, {
            id: 11,
            label: '三级 1-1-2'
          }]
        }]
      }],
      props: {
          children: 'children',
          label: 'label',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
      }, // 节点信息与数据的映射关系指定，id如果没有指定则默认为Id，一次类推
      cache: [],
      timeout: null,
      level: false,
              gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        header: '',
        showDialog: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        dateNow: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    createDate() {
      return parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
      
    },
    ctrlDialog(header) {
      this.header = header
      this.showDialog = !this.showDialog
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    checkedNode (checked) {
      if (checked ) {
        return true
      } else {
        this.$message({
          message: '请选择要的部门',
          type: 'warning'
        });
        return false
      }
    },
    appendChild(data, node) {
      console.log('appendChild:', data, node)
      this.ctrlDialog("添加子部门")
    },
    appendSiblings(data, node) {
      console.log('appendSiblings:', data, node)
      this.ctrlDialog("添加同级部门")
    },
    updateNode(data, node) {
      console.log('getNoupdateNodede:', data, node)
      this.ctrlDialog("编辑")
    },
    removeNode(data, node) {
      console.log('removeNode:', data, node)
    },
    disableNode(data) {
        console.log('disableNode:',this,data,data.id)
        this.$set(data,'disabled',data.disabled)
        data.disabled = !data.disabled
    },
    debounce() {
    }
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
