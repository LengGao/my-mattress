<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="组织ID" prop="id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.id" disabled /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="组织名称" prop="name">
                <el-col :span="20"><el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="上级组织" prop="parent_id">
            <template v-if="type === 'edit'">
                <el-col :span="20"><el-select v-model="form.parent_id" :label="form.parent_name" filterable>
                    <el-option-group v-for="group in optParent" :key="`group_${group.id}`" :label="group.name">
                        <el-option :label="group.name" :value="group.id"></el-option>
                        <el-option v-for="item in group.child" :key="`option_${item.id}`" :label="item.name" :value="item.id"></el-option>
                    </el-option-group>
                </el-select></el-col>
            </template>
            <template v-else>
                <el-col :span="20"><el-input v-model="form.parent_id" :label="form.parent_name" disabled></el-input></el-col>
            </template>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="组织类型" prop="type">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.type" >
                    <el-option v-for="item in optType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select></el-col>
            </el-form-item></el-col>
         </el-row>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="排序" prop="sort">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model.number="form.sort" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="状态" prop="status">
                <el-col :span="20"><el-select placeholder="请选择" v-model="form.status">
                    <el-option v-for="item in optStatus" :key="item.value" :label="item.label" :value=" item.value"></el-option>
                </el-select></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="创建人" prop="creator_name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.creator_name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="创建时间" prop="created_at">
                <el-col :span="20"><el-date-picker v-model="form.created_at" :disabled="type !== 'edit'" type="datetime" placeholder="选择创建时间"> </el-date-picker></el-col>
            </el-form-item></el-col>
         </el-row>

         <el-row type="flex" justify="center">
            <el-form-item style="margin-top: 20px;">
                <el-button type="primary" @click="onSubmit('form')" :loading="buttonLoading">提交</el-button>
                <el-button type="warning" @click="onReset('form')">重置</el-button>
                <el-button type="info" @click="onCancel">取消</el-button> 
            </el-form-item>
         </el-row>
     </el-form>
 </div>
</template>

<script>
import MyHead from '@/components/MyHeader/index'
import { create,update,search,all } from '@/api/infrastructure/organization'
import { YYYY_MM_dd_hh_mm_ss } from '@/utils/format'

const formConfig = [
    {label: '门店编码',key: 'id',valid: 'required'},
    {label: '门店全称',key: 'name',valid: 'required'},
    {label: '门店简称',key: 'short_name',valid: 'required'},
    {label: '门店编码',key: 'type',valid: 'required'},
    {label: '门店编码',key: 'dept_id',valid: 'required'},
]

 export default {
    components: {MyHead},
    data() {
      return {
        /*--- form data ---*/
        form: { id:'',name: '',parent_id: '',parent_name: "" ,type: '',sort: '',status: '',creator_name: '',created_at: ''},
        preform: [],
        rules: {},
        optType: [{label: '层级/部门',value: 1},{label: '门店',value: 2}], // 禁用在项里加disabled属性
        optParent:  [],
        optStatus: [{label: '启用',value: 1},{label: '禁用',value: 0}],
        formLoading: false,
        optionsLoading: false,
        buttonLoading: false,
        /*--- other data ---*/
        title: '', // 页面标题
        data_rigin: '', // 数据源Id
        type: '', // 操作类型
      }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
              case 'addChild': this.title = '添加子部门'; break;
              case 'addSibling': this.title = '添加同级部门'; break;
              case 'edit': this.title = '编辑'; break; 
            }
        },
        handlerClose() {        
            this.$router.back()
        },
        /*--- 表单逻辑 ---*/
        onSubmit(refName) {
            // this.$refs[refName].validate((valid) => { if (valid) { console.log("valid",valid); }else{ console.log("valid",valid); }})
            this.buttonLoading = true
            let params = this.form
            ,   submit = this.type === 'edit' ? update : create
            if (this.type !== 'edit') { parent_name.created_at = YYYY_MM_dd_hh_mm_ss(new Date()) }
            submit(params).then(res => {
                if(res.status === 200) { this.$message.success('操作成功！') }
                else { this.$message.error('操作失败！请联系管理员:'+ res.msg) }
            }).catch(err => {
                this.$message.error('请求发送失败！请联系管理员')
                throw new Error(err)
            }).finally(() => {
                this.buttonLoading = false
            })
        },
        onReset(refName) {
            this.$refs[refName].resetFields();
            // console.log("form",this.form);
        },
        onCancel() {
            this.$router.back()
        },
        // 获取详情数据
        fetchDataForm(id) {
            this.formLoading = true
            search({id}).then(res => {
                let _form = {}
                if (this.type === 'addChild') { _form.parent_name = res.data.name; _form.parent_id = res.data.id; }
                else if (this.type === 'addSibling') { _form.parent_name = res.data.parent_name; _form.parent_id = res.data.parent_id; }
                else { _form = res.data }
                this.form = _form
            }).catch(err => {
                this.$message.error("加载失败")
            }).finally(()=> {
                this.formLoading = false
            })
        },
        /*--- 公共逻辑 ---*/
        // 获取上级部门
        fetchDataDepartment() {
            all().then(res => this.optParent = res.data ).catch(err => console.log(`上级部门信息获取失败:${err.msg}`))
        },
    },
    watch: {
        $route: {
          handler (to,from) {
              // console.log("route",to.query);
              this.type = to.query.type
              this.data_rigin = to.query.id ? to.query.id : ''
              this.onSetTitle(to.query.type)
          },
          immediate: true
        }
    },
    created() {
        if (!!this.data_rigin) { this.form.id = this.data_rigin; this.fetchDataForm(this.data_rigin) }
        if(this.type === 'edit') { this.fetchDataDepartment()}
    },
 }
</script>

<style scoped>

</style>