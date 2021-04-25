<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="产品Id" prop="id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.id" disabled/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="产品编号" prop="code">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.code" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="产品名称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="单价" prop="actual_price">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model.number="form.actual_price" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="产品类型" prop="type">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.type">
                    <el-option v-for="item in optType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="适用范围" prop="size_id">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="size_id">
                    <el-option-group v-for="group in optScopes" :key="'group' + group.id" :label="group.name">
                        <el-option :label="group.name" :value="group.id"></el-option>
                        <el-option v-for="item in group.child" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-option-group>
                </el-select></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="排序" prop="sort">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.sort" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="上架状态" prop="actual_price">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.size_id">
                    <el-option v-for="item in optStatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select></el-col>
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
import { scopes } from '@/api/commodity/product'
import { create,update,search,allTypes } from '@/api/commodity/attributeCombination'

const formConfig = [
    {label: '产品编码',key: 'id',valid: 'required'},
    {label: '产品全称',key: 'name',valid: 'required'},
    {label: '产品简称',key: 'short_name',valid: 'required'},
    {label: '产品编码',key: 'type',valid: 'required'},
    {label: '产品编码',key: 'dept_id',valid: 'required'},
]

 export default {
    components: {MyHead,MySelect},
    data() {
        return {
            /*--- form data ---*/
            form: { 
                id:'',code: '',name:'',status:'',type:'',actual_price:'',sort:'',creator_name:'',created_at:''
            },
            dept_ids: [], // 使用范围，格式：[1,2,3,…]
            sku_list: [], // 产品属性 [{“attribute_id”:1, “attribute_value_id”:1, “price”:100},…]
            preform: [],
            rules: {},
            formLoading: false,
            buttonLoading: false,
            headers: {},
            withCredentials: false,
            fileList: [],
            editorOption: {},
            /*--- table data ---*/
            list: [],
            listLoding: true,
            /*--- other data ---*/
            title: '',
            data_rigin: '', // 路由产品Id
            optType: [], // 禁用在项里加disabled属性
            optScopes: [],
            optSizes: [],
            optAttribute: [],   
            optStatus: [{label: '下架',value: 0},{label: '上架',value: 1}],
            editor: null,
            editorData: ''
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
                case 'edit': this.title = '编辑产品'; break;
                case 'add': this.title = '添加产品'; break;
                case 'detail': this.title = '产品详情'; break; 
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
        },
        onCancel() {
            this.$router.back()
        },
        onChange(e,v) {
            console.log('onChange:',e,v,this.form);
        },
        onDelete(data, type) {
            const index_attr = this.form.attribute_values.indexOf(data)
            , index_size = this.form.size_prices.indexOf(data)
            if (type === 'attribute' && index_attr !== -1) {
                this.form.attribute_values.splice(index_attr, 1)
            }
            if (type === 'size' && index_size !== -1) {
                this.form.size_prices.splice(index_size, 1)
            }
        },
        onAdd(type) {
            if (!this.form.size_id) { this.$message.info('请先选择尺寸')}
            let attribute_length = 'attr_' + this.form.attribute_values.length
            let siez_length = 'size_' + this.form.size_prices.length
            if (type === 'attribute') {
                this.form.attribute_values.push({id: attribute_length, name: '', value: ''})
            }
            if (type === 'size') {
                this.form.size_prices.push({id: siez_length, size_id: '', attribute_value_id: '', price: ''})
            }
        },
        handlerChangeSize(value) {
        },
        onOptionClick(e,v){
            console.log('onOptionClick:',e,v);
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
        submitUpload(event) {
            if (this.fileList.length <= 0) return this.$message.info("请上传图片");
            this.$refs.upload.submit()
        },
        beforeUpload(file, fileList) {
            // console.log(file, fileList);
        },
        uploadChange(file, fileList) {
            // console.log(file, fileList);
            this.fileList = fileList
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePreview(file) {
            // console.log(file);
        },
        uploadError(file, fileList) {
            // console.log(file, fileList);
            this.$message({type:'error', message: `上传失败${file}`})
        },
        uploadSuccess(respone, file) {
            console.log("uploadSuccess",respone,file);
            let data = respone.data
            data.is_default = 0
            data.id = this.list.length + 1
            this.$message.success('上传成功')
            this.list.push(data)
        },
        // 表格逻辑
        handlerSetDafault(index, data) {
            let list = this.list
            list.forEach((item,i) => {             
                if (item.id === data.id ) {
                    item.is_default = 1
                } else {
                    item.is_default = 0
                }
            })
            list.sort((a,b) => {
              return b.is_default - a.is_default
            })
            this.list = list
            this.listLoding = false
            setTimeout(() => {
                this.listLoding = true
            },1000)
        },
        handlerDelete(index, data) {
            this.form.images.splice(index,1)
        },
        sortChange() {
            console.log("sortChange");
        },
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        },
        getDataForm(id) {
            this.formLoading = true
            search({id}).then(res => {
                this.form = res.data
                if (res.data.images && res.data.images.length > 0) {
                   this.list =  res.data.images.map((item,i) => {
                        return item.id = i + 1
                    })
                }
            }).catch(err => {
                console.log("getDataForm",err);
                this.$message.error("加载失败")
            }).finally(()=> {
                this.formLoading = false
            })
        },
        getOptType() {
            allTypes().then(res => {
                this.optType = res.data
            }).catch(err => {
                console.log("getOptType",err);
                this.$message.error("加载失败")
            })
        },
        getOptScopes(id) {
            scopes({id}).then(res => {
                this.optScopes = res.data
            }).catch(err => {
                console.log("getOptScopes",err);
                this.$message.error("加载失败")
            })
        },
        /*--- 公共逻辑 ---*/
        initComponet() {
            this.getOptType()
        },
        preFormRules(refNames) {
            // 校验配置与逻辑 按时不做
            // let obj = Object.assign({},this.form)  // 一级属性深拷贝，二级属性浅拷贝，相同属性后盖前
            // let preObj = [];
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
    beforeCreate() {
        console.log("beforeCreate:",this)  
    },
    created() {
        // console.log("created:",this);    
        this.initComponet()
        if (this.data_rigin) {
            this.form.id = this.data_rigin
            this.getDataForm(this.data_rigin)
        }
        this.getOptScopes(this.data_rigin)
    },
 }
</script>

<style scoped>
.title {
    line-height: 50px;
    background: #ccc;
}

.flex-tittle {
    text-align: center;
}

.home {
    width: 100%;
    margin: auto;
}
</style>