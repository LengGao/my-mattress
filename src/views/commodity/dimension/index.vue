<template>
  <div class="app-dimension">
    <div class="app-container" v-show="!pageChange">
      <div class="form-block">
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
      </div>

      <div class="table-block">
        <el-table
          v-loading='listLoading' element-loading-text='Loading' :data='list'
          border fit stripe size='medium'>
          <div slot='empty'><span>暂无数据</span>&nbsp;&nbsp;<el-button type='text' @click='initTable'>初始化列表</el-button></div>
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column v-for="item in preList" :key="item.id" :label="item.label" width="140" align="center">
            <template v-slot="scope">
              {{ scope.row[item.key] }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="操作">
            <template slot-scope='scope'>
              <el-button type='text' @click='() => edit(scope.$index, scope.row)'>编辑</el-button>
              <el-button type='text' @click='banDebouce(scope.$index, scope.row)'>
                {{scope.row.status === 1 ? '禁用' : ' 启用'}}
                </el-button>
              <el-button type='text' @click='() => resetPwd(scope.$index, scope.row)'>重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class='pagination-block' style='display: flex; align-items: center;'>
        <el-pagination :current-page='currentPage' :page-size='pageSize' :total='total'
        @size-change='handleSizeChange' @current-change='handleCurrentChange'
        layout='total, sizes, prev, pager, next, jumper'>
        </el-pagination>
        <el-button type='parimary' round size='mini'>go</el-button>
      </div>
    </div>
    <Modify v-show="!pageChange" />

  </div>
</template>

<script>
import {allOrganization}  from '@/api/commodity/dimension'
import {search, ban} from '@/api/commodity/dimension'
import {vueDebounce} from '@/utils/index'
import Modify from './modify'
export default {
  // 此村管理
  components: { Modify },
  data() {
    return {
      /*--- search form ---*/
      form: {
        name: '',
        status: ''
      },
      /*--- table data && pagination---*/
      list: [],
      preList: [
        {label: '尺寸名称cm',key:'name'},
        {label: '标准宽度cm',key:'width'},
        {label: '标准长度cm',key:'length'},
        {label: '标准厚度cm',key:'thickness'},
        {label: '宽度下限（含）cm',key:'min_width'},
        {label: '宽度上限cm',key:'max_width'},
        {label: '长度下限（含）cm',key:'min_length'},
        {label: '长度上限cm',key:'max_length'},
        {label: '厚度下限（含）cm',key:'min_thickness'},
        {label: '厚度上限cm',key:'max_thickness'},
        {label: '是否启用',key:'status'},
        {label: '创建人',key:'creator_name'},
        {label: '创建时间',key:'created_at'}
        ],
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
  },
  methods: {
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
    banDebouce: vueDebounce('baner'),
    baner(index,data){
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
    resetPwd(index,{id,status}) {

    },
    fetchData(option) {
      this.listLoading = true
      search(option).then(response => {
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
      var {currentPage,pageSize,form} = this
      var option = {page: currentPage,size: pageSize,name: form.name,status: form.status}
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
  },
  destroyed(){
    vueDebounce = null
  }
}
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}
.table-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
