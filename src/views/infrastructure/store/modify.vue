<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="门店编码" prop="ids">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.ids" readonly/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="门店全称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="门店简称" prop="short_name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.short_name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="门店类型" prop="type">
                <el-col :span="20"><MySelect placeholder="請輸入" v-model="form.type" :data="optType" @change="onChange" clea> </MySelect></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="上级组织架构" prop="parent_id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="性质" prop="property">
                <el-col :span="20"><MySelect placeholder="請輸入" v-model="form.property" :data="optProperty" @change="onChange" ></MySelect></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="筹备日期" prop="prepare_date">
                <el-col :span="20"><el-date-picker  placeholder="选择日期" v-model="form.prepare_date"></el-date-picker></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="开业日期" prop="open_date">
                <el-col :span="20"><el-date-picker placeholder="請輸入" v-model="form.open_date"></el-date-picker></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="门店地址" prop="address">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.address" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="结业日期" prop="finish_date">
                <el-col :span="20"><el-date-picker placeholder="請輸入" v-model="form.finish_date"></el-date-picker></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="初始投资" prop="investment">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.investment" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="门店状态" prop="status">
                <el-col :span="20"><el-input placeholder="請輸入" v-model="form.status" readonly /></el-col>
            </el-form-item></el-col>
         </el-row>
        <div style="padding: 20px;"><h3>面积信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="占地面积" prop="total_area">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.total_area" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="实用面积" prop="actual_area">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.actual_area" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
        <div style="padding: 20px;"><h3>租赁信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="租赁方名称" prop="leaseholder">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.leaseholder" :maxlength="20"/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="租赁日期" prop="start_lease_at">
                <el-col :span="20"><el-date-picker placeholder="请选择" v-model="form.start_lease_at"></el-date-picker>—<el-date-picker placeholder="请选择" v-model="form.end_lease_at"></el-date-picker></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="租金标准(元/方）" prop="lease_price">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.lease_price" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="物业费标准(元/方）" prop="estate_price">
                <el-col :span="20"><el-input placeholder="請輸入" v-model="form.estate_price" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="月租（元）" prop="month_rent">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.month_rent" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="备注" prop="remark">
                <el-col :span="20"><el-input placeholder="請輸入" v-model="form.remark" :maxlength="50" /></el-col>
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
import { create,update,search } from '@/api/infrastructure/store'
 export default {
    components: {MyHead,MySelect},
    data() {
        return {
            /*--- form data ---*/
            form: { ids:'',name:'',short_name:'',type:'',property:'',prepare_date:'',open_date:'',finish_date:'',address:'',investment:'',
                total_area:'',actual_area:'',leaseholder:'',start_lease_at:'',end_lease_at:'',lease_price:'',estate_price:'',
                month_rent:'',month_rent:'',creator_name:'',created_at:'',province_id:'',city_id:'',district_id:''
            },
            rules: {},
            formLoading: false,
            buttonLoading: false,
            /*--- other data ---*/
            title: '',
            data_rigin: '', // 路由门店Id
            optType: [{label: '社区店',value: 1},{label: '商圈店',value: 2}], // 禁用在项里加disabled属性
            optProperty:  [{label: '直营',value: 1},{label: '加盟',value: 2},{label: '合作',value: 3}]
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
                case 'edit': this.title = '编辑门店'; break;
                case 'add': this.title = '添加门店'; break;
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
            const params = this.form
            this.buttonLoading = true
            create(params).then(res => {
                if(res.status === 200) this.$message.success('操作成功！') 
            }).catch(err => {
                this.$message.error('操作失败！请联系管理员')
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
        /*--- 公共逻辑 ---*/
        initComponet(){
            if (this.data_rigin) this.form.id = this.data_rigin
            // console.log("initComponet",this.data_rigin,this.form);
        },
        selectRender(refNames) {
            return this.$createElement('<div>',{   attrs: { id: 'foo'},style: {width: '1000px',background: 'red'}},[],'render','.page-modify',this)
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
    created() {
        // console.log("created:",this);
        this.initComponet()
        if (this.data_rigin) this.getDataForm(this.data_rigin)
    },
    mounted(){
        // console.log("mounted:",this);
    },
    updated(){
        // console.log("updated:",this);
    }
 }
</script>

<style scoped>
</style>