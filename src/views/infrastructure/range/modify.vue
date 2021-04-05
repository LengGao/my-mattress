<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="节点ID" prop="id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.id" disabled/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="节点名称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="父级节点" prop="parent_id">
                <el-col :span="20">
                    <el-select placeholder="請輸入" v-model="form.parent_id">
                        <el-option v-if="form.parent_id === 0" label="中国" :value="0"></el-option>
                        <el-option-group v-for="group in optionParent" :key="'group' + group.id" :label="group.name">
                            <el-option :label="group.name" :value="group.id"></el-option>
                            <el-option v-for="item in group.child" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-option-group>
                    </el-select>
                </el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="城市等级" prop="type">
                <el-col :span="20"><el-select placeholder="請选择" v-model="form.grade">
                    <el-option v-for="(item, index) in optionLevel" :key="index" :label="item.name" :value="item.value"> </el-option>
                </el-select></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="状态" prop="status">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.status">
                    <el-option v-for="(item, index) in optionStatus" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="排序" prop="sort">
                <el-input v-model.number="form.sort" placeholder="请输入来排序数值"></el-input>
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
import { allRage,create,update,search,cityGenders, provinces, cities} from '@/api/infrastructure/range'

 export default {
    components: {MyHead},
    data() {
        return {
        /*--- form data ---*/
        form: { id: '', name: "",parent_id: '', type: '', status: 1, sort: '', grade: ''},
        preform: [],
        rules: {},
        formLoading: false,
        buttonLoading: false,
        /*--- other data ---*/
        title: '',
        data_rigin: '', // 路由门店Id
        optionStatus: [{label: '禁用', value: 0},{label: '启用', value: 1}],
        optionLevel: [],
        optionParent: []
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
            case 'edit': this.title = '编辑地区'; break;
            case 'add': this.title = '添加地区'; break;
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
        },
        onCancel() {
            this.$router.back()
        },
        // 上级节点
        fetchParentNode() { 
            // 地区类型[1:省,2:市,3:区]
            allRage().then(res => this.optionParent = res.data).catch(err => console.log(`上级节点获取错误${err}`))
        },
        // 获取城市等级
        fetchCityLevel() {
            cityGenders().then(res => this.optionLevel = res.data).catch(err => console.log(`城市等级获取错误${err}`))
        },
        // 获取地区详情
        async getDataForm(id) {
            this.formLoading = true
            await search({id}).then(res => this.form = res.data).catch(err => this.$message.error("加载失败")).finally(() => this.formLoading = false)
            await this.fetchParentNode()
        },
        /*--- 公共逻辑 ---*/
        initComponet(){ 
            this.fetchCityLevel()            
        },
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
        console.log("created:",this);
        this.initComponet()
        if (this.data_rigin) {
            this.form.id = this.data_rigin
            this.getDataForm(this.data_rigin)
        }
    },
    mounted() {
        console.log("mounted:",this);
    },
    updated() {
        // console.log("updated:",this);
    }
 }
</script>

<style scoped>
</style>