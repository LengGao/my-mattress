<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="菜单ID" prop="id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.id" disabled/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="菜单名称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="父级菜单" prop="parent_id">
                <el-col :span="20">
                    <el-select placeholder="请输入" v-model="form.parent_id">
                        <el-option label="顶层" :value="0"></el-option>
                        <el-option v-for="item in optionParent" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="页面地址" prop="页面地址">
                <el-col :span="20"> <el-input placeholder="请输入" v-model="form.url" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="状态" prop="status">
                <el-col :span="20"><el-select placeholder="请输入" v-model="form.status">
                    <el-option v-for="(item, index) in optionStatus" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="排序" prop="sort">
                <el-input v-model.number="form.sort" placeholder="请输入来排序数值"></el-input>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-table :data='operations' ref="operations" row-key="id" border fit stripe size='medium' @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" :selectable="selectable">
                </el-table-column>   
                <el-table-column label="编码" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.code"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="是否使用" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.is_selected" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <template v-slot:append>
                    <el-button @click="onAdd(operations)"><i class="el-icon-plus"></i></el-button>
                    <el-button @click="onDelete(operations)"><i class="el-icon-minus"></i></el-button>
                </template>
            </el-table>

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
import {all, create,update,search } from '@/api/infrastructure/menu'
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
        form: { id:'',name:'',parent_id: '',url:'',status: '',sort: '',operation: [] },
        operations: [],
        selectOperations: [],
        preform: [],
        rules: {},
        formLoading: false,
        buttonLoading: false,
        /*--- other data ---*/
        title: '',
        data_rigin: '', // 路由门店Id
        optionStatus: [{label: '禁用',value: 0},{label: '启用',value: 1}],
        optionParent: []
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
                case 'edit': this.title = '编辑菜单'; break;
                case 'add': this.title = '添加菜单'; break;
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
            let  submit = this.data_rigin ? update : create
            let _list = [] 
            this.operations.filter( item => {
                if (item.hasOwnProperty('id')) delete item['id']
                if (item.hasOwnProperty('notNotify')) delete item['notNotify']
                _list.push(item)
            })
            params.operation = JSON.stringify(_list)
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
        onAdd() {
            let id = this.operations.length + 1
            let obj = {id: id, code: '', name: '', is_selected: false, notNotify: false}
            this.operations.push(obj)
        },
        onDelete() {
            let _list = this.selectOperations
            let _operations = this.operations
            if (_list && _list.length > 0 ) {
                for(let  i = 0; i < _list.length; i++) {
                    for (let j = 0; j < _operations.length; j++){
                        if (_list[i].id === _operations[j].id) {
                            _operations.splice(j, 1)
                        }
                    }
                }            
            } else { 
                this.$message.error('请选择要删除项')
            }
            
        },
        handleSelectionChange(v1,v2) {
            console.log(v1, v2);
            this.selectOperations = v1
        },
        selectable(data, index) {
            return  !data.notNotify ? true : false
        },
        getDataOptDept() {
            all().then(res => {
                this.optionParent = res.data
            })
        },
        getDataForm(id) {
            this.formLoading = true
            search({id}).then(res => {
                let _operation = JSON.parse(res.data.operation)
                let _form = res.data
                _operation.forEach((item,index) => { 
                    item.id = index + 1
                    item.notNotify = true
                })
                _form.operation = _operation
                this.operations = _operation
                this.form = _form             
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
            this.getDataOptDept();
            
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