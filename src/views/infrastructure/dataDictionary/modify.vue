<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="数据字典名称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="值" prop="value">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.value" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="排序" prop="sort">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.sort" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="是否启用" prop="type">
                <el-col :span="20">
                    <el-select placeholder="状态" v-model="form.status">
                        <el-option v-for="item in optStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="创建人" prop="creator_name">
                <el-col :span="20">
                    <el-input v-model="form.creator_name"></el-input>
                </el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="创建时间" prop="created_at">
                <el-col :span="20"><el-date-picker  placeholder="选择日期" v-model="form.created_at"></el-date-picker></el-col>
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
import MySelect from '@/components/MySelect/index'
import { allOrganization } from '@/api/infrastructure/organization'
import { create,update,search } from '@/api/infrastructure/dataDictionary'
const formConfig = [
    {label: '数字字典名称',key: 'id',valid: 'required'},
    {label: '值',key: 'name',valid: 'required'},
    {label: '排序',key: 'short_name',valid: 'required'},
    {label: '是否启用',key: 'type',valid: 'required'},
    {label: '门店编码',key: 'dept_id',valid: 'required'},
    {label: '门店编码',key: 'dept_id',valid: 'required'},
    {label: '门店编码',key: 'dept_id',valid: 'required'},
]

 export default {
    components: {MyHead,MySelect},
    data() {
        return {
            /*--- form data ---*/
            form: {id: '', code: '', value: '', status: '',sort: '', category_id: '',creator_name: '', created_at: ''},
            preform: [],
            rules: {},
            formLoading: false,
            buttonLoading: false,
            /*--- other data ---*/
            title: '',
            data_rigin: '', // 路由门店Id
            optType: [{label: '社区店',value: 1},{label: '商圈店',value: 2}], // 禁用在项里加disabled属性
            optProperty:  [{label: '直营',value: 1},{label: '加盟',value: 2},{label: '合作',value: 3}],
            optStatus: [{label: '启用',value: 1},{label: '禁用',value: 0}],
            optDept: []
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
                case 'edit': this.title = '编辑数据字典'; break;
                case 'add': this.title = '添加数据字典'; break;
                case 'detail': this.title = '门店详情'; break; 
                default: ; break;
            }
        },
        handlerClose() {
            this.$router.back()
        },
        /*--- 表单逻辑 ---*/
        onSubmit(refName) {
            // this.$refs[refName].validate((valid) => { if (valid) { console.log("valid",valid); }else{ console.log("valid",valid); }})
            let params = this.form;
            this.buttonLoading = true
            var submit = this.data_rigin ? update : create
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
        onChange(e,v) {
            console.log('onChange:',e,v,this.form);
        },
        onOptionClick(e,v){
            console.log('onOptionClick:',e,v);
        },
        getDataForm(id) {
            this.formLoading = true
            search({id}).then(res => {
                this.form = res.data
            }).catch(err => {
                this.$message.error("加载失败")
            }).finally(()=> {
                this.formLoading = false
            })
        },
        handlerBeginData(val) {
            if(val) {
                this.form.finish_date ? this.form.status = 3 :this.form.status = 2 
            } else {
               this.form.finish_date ? this.form.status = 3 :this.form.status = 1
            }
        },
        handlerFinishData(val) {
            if(val) { 
                this.form.status = 3
            } else {
                this.form.open_date ? this.form.status = 2 :this.form.status = 1 
            }
        },
        /*--- 公共逻辑 ---*/
        initComponet(){
            // console.log("initComponet",this.data_rigin,this.form);
        },
        preFormRules(refNames) {
            // 校验配置与逻辑 按时不做
            // let obj = Object.assign({},this.form)  // 一级属性深拷贝，二级属性浅拷贝，相同属性后盖前
            // let preObj = [];
        }
    },
    watch: {
        $route: {
            handler (to,from) {
                // console.log("route",to.query);
                this.onSetTitle(to.query.type)
                this.data_rigin = to.query.id ? to.query.id : ''
            },
            immediate: true
        }
    },
    beforeCreate() {
        console.log("beforeCreate:",this);
    },
    created() {
        // console.log("created:",this);
        this.initComponet()
        if (this.data_rigin) {
            this.form.id = this.data_rigin
            this.getDataForm(this.data_rigin)
        } 
    },
    mounted() {
        // console.log("mounted:",this);
    },
    updated() {
        // console.log("updated:",this);
    }
 }
</script>

<style scoped>
</style>