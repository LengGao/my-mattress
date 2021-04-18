<template>
 <div class="page-modify">
     <MyHead :mtitle="title" @click="handlerClose"> </MyHead>
     <el-form :model="form" ref="form" :rules="rules" class="form" style="margin: 20px 0;" label-suffix=":" label-width="150px" 
        v-loading="formLoading" hide-required-asterisk show-message>
        <div style="padding: 20px;"><h3>基本信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="属性编号" prop="id">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.id" disabled/></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="属性名称" prop="name">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model="form.name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label=" 显示名称" prop="display_name">
                <el-col :span="20"><el-input placeholder="請輸入" v-model="form.display_name" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="排序" prop="sort">
                <el-col :span="20"> 
                    <el-input placeholder="請輸入" v-model="form.sort" :maxlength="20" />
                </el-col>
            </el-form-item></el-col>
         </el-row>
         
        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="产品必填属性" prop="is_required">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.is_required">
                    <el-option v-for="item in optType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="长度范围cm" prop="status">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.status">
                    <el-option v-for="item in optStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
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

        <el-row type="flex" justify="space-around" :gutter="2" class="title">
            <el-col :span="6" class="flex-tittle">选项名称</el-col>
            <el-col :span="6" class="flex-tittle">排序</el-col>
            <el-col :span="6" class="flex-tittle">操作</el-col>
        </el-row>
        <template v-for="attribute in form.attribute_values">
            <el-row type="flex" :gutter="2" justify="space-around" :key="'attr_' + attribute.id" style="margin-top: 10px">
                <el-col :span="6" class="flex-tittle" >
                    <el-input v-model="attribute.name" />
                </el-col>
                <el-col :span="6" class="flex-tittle" >
                    <el-input v-model="attribute.sort" />
                </el-col>
                <el-col :span="6" class="flex-tittle" >
                    <el-button type="text" @click="onDelete(attribute   , 'attribute')"> 删除 </el-button>
                </el-col>
            </el-row>
        </template>
        <el-row type="flex" justify="space-around" >
             <el-button type="text" @click="onAdd('attribute')"><i class="el-icon-plus" style="font-size: 30px;"></i> </el-button>
        </el-row>

        <el-row type="flex" justify="space-around" class="title">
            <el-col :span="6" class="flex-tittle">尺寸</el-col>
            <el-col :span="6" class="flex-tittle">属性名称</el-col>
            <el-col :span="6" class="flex-tittle">单价</el-col>
            <el-col :span="6" class="flex-tittle">操作</el-col>
         </el-row>
        
        <template v-for="size in form.size_prices" >
            <el-row type="flex" justify="space-around" :key="'size_' + size.id" style="margin-top: 10px">
                <el-col :span="6" class="flex-tittle" > 
                     <el-select v-model="size.size_id" >
                        <el-option v-for="(attr,index) in optAttribute" :key="'opt_size' + index" :label="attr.name" :value="attr.id"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="flex-tittle" >
                    <el-select v-model="size.attribute_id" >
                        <el-option v-for="(size,index) in optSizes" :key="'opt_attr' + index" :label="size.name" :value="size.id"> </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="flex-tittle" >
                    <el-input v-model="size.price" />
                </el-col>
                <el-col :span="6" class="flex-tittle" >
                    <el-button type="text" @click="onDelete(size, 'size')"> 删除 </el-button>
                </el-col>
            </el-row>
        </template>
        <el-row type="flex" justify="space-around" >
             <el-button type="text" @click="onAdd('size')"><i class="el-icon-plus" style="font-size: 30px;" ></i> </el-button>
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
import { get as getAllSize } from '@/api/commodity/dimension'
import { create,update,search,get } from '@/api/commodity/attribute'
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
                id:'',name:'',display_name:'',sort:'',status:'',is_required:'',creator_name:'',created_at:'',
                attribute_values: [{id: '',name: '', sort: ''}],
                size_prices: [{id: '', size_id: '', attribute_value_id: '', price: ''}]
            },
            preform: [],
            rules: {},
            formLoading: false,
            buttonLoading: false,
            /*--- other data ---*/
            title: '',
            data_rigin: '', // 路由门店Id
            optType: [{label: '否',value: 0},{label: '是',value:1}], // 禁用在项里加disabled属性
            optStatus: [{label: '下架',value: 0},{label: '上架',value:1}],
            optAttribute:  [],
            optSizes: []
        }
    },
    methods: {
        /*--- header逻辑 ---*/
        onSetTitle (type) {
            switch(type) {
                case 'edit': this.title = '编辑属性'; break;
                case 'add': this.title = '新增属性'; break;
                case 'detail': this.title = '属性详情'; break; 
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
            let attribute_length = 'attr_' + this.form.attribute_values.length
            let siez_length = 'size_' + this.form.size_prices.length
            if (type === 'attribute') {
                this.form.attribute_values.push({id: attribute_length, name: '', value: ''})
            }
            if (type === 'size') {
                this.form.size_prices.push({id: siez_length, size_id: '', attribute_value_id: '', price: ''})
            }
        },
        onOptionClick(e,v){
            console.log('onOptionClick:',e,v);
        },
        getDataOpts() {
            getAllSize().then(res_size => {
                this.optSizes = res_size.data
                })
            get().then(res_attr => {
                this.optAttribute = res_attr.data
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
        this.getDataOpts()
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
.title {
    line-height: 50px;
    background: #ccc;
}

.flex-tittle {
    text-align: center;
}
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