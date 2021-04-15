<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="门店编号" prop="id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.id" disabled/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="尺寸名称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="标准长度" prop="length">
                <el-col :span="20"><el-input placeholder="請輸入" v-model="form.length" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="标准宽度" prop="width">
                <el-col :span="20"> 
                    <el-input placeholder="請輸入" v-model="form.width" :maxlength="20" />
                </el-col>
            </el-form-item></el-col>
         </el-row>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="标准厚度" prop="thickness">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.thickness" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="长度范围cm" prop="range_length">
                <el-col :span="9"> <el-input placeholder="請輸入下限" v-model="form.min_length" :maxlength="20" /></el-col>
                <el-col :span="2">（含）</el-col>
                <el-col :span="9"> <el-input placeholder="請輸入上限" v-model="form.max_length" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="宽度范围cm" prop="range_width">
                <el-col :span="9"> <el-input placeholder="請輸入下限" v-model="form.min_width" :maxlength="20" /></el-col>
                <el-col :span="2">（含）</el-col>
                <el-col :span="9"> <el-input placeholder="請輸入上限" v-model="form.max_width" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="厚度范围cm" prop="range_thickness">
                <el-col :span="9"> <el-input placeholder="請輸入下限" v-model="form.min_thickness" :maxlength="20" /></el-col>
                <el-col :span="2">（含）</el-col>
                <el-col :span="9"> <el-input placeholder="請輸入上限" v-model="form.max_thickness" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="创建人" prop="creator_name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.creator_name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="创建时间" prop="created_at">
                <el-col :span="20"><el-date-picker placeholder="請輸入" v-model="form.created_at" @change="handlerFinishData"></el-date-picker></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="22"><el-form-item label="状态" prop="status">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.status">
                    <el-option v-for="item in optStatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select></el-col>
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
import { create,update,search,get } from '@/api/commodity/dimension'
const formConfig = [
    {label: '门店编码',key: 'id',valid: 'required'},
    {label: '门店全称',key: 'name',valid: 'required'},
    {label: '门店简称',key: 'short_name',valid: 'required'},
    {label: '门店编码',key: 'type',valid: 'required'},
    {label: '门店编码',key: 'dept_id',valid: 'required'},
]

 export default {
    components: {MyHead,MySelect},
    data() {
        return {
            /*--- form data ---*/
            form: { 
                id:'',name:'',length:'',width:'',thickness:'',min_width:'',max_width:'',min_length:'',max_length:'',
                min_thickness:'',max_thickness:'',creator_name:'',created_at:'',status:'',
            },
            preform: [],
            rules: {},
            formLoading: false,
            buttonLoading: false,
            /*--- other data ---*/
            title: '',
            data_rigin: '', // 路由门店Id
            optType: [{label: '社区店',value: 1},{label: '商圈店',value: 2}], // 禁用在项里加disabled属性
            optProperty:  [{label: '直营',value: 1},{label: '加盟',value: 2},{label: '合作',value: 3}],
            optStatus: [{label: '下架',value: 0},{label: '上架',value:1}],
            optDept: []
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
                case 'edit': this.title = '编辑尺寸'; break;
                case 'add': this.title = '新增尺寸'; break;
                case 'detail': this.title = '尺寸详情'; break; 
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
        getDataOptDept() {
            allOrganization().then(res => {
                this.optDept = res.data
            })
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
// preForm: [
//     {label: '尺寸名称',key: '',type: ''},
//     {label: '标准长度cm',key: '',type: ''},
//     {label: '标准宽度cm',key: '',type: ''},
//     {label: '标准厚度cm',key: '',type: ''},
//     {label: '长度范围cm（含下限）',key: '',type: ''},
//     {label: '宽度范围cm（含下限）',key: '',type: ''},
//     {label: '厚度范围cm（含下限）',key: '',type: ''},
//     {label: '是否启用',key: '',type: ''},
//     {label: '创建人',key: '',type: ''},
//     {label: '创建时间',key: '',type: ''}
// ]