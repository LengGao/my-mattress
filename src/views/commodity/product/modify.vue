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
            <el-col :span="10"><el-form-item label="产品类型" prop="type">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.type">
                    <el-option v-for="item in optType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="尺寸" prop="size_id">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="form.size_id" @change="handlerChangeSize">
                    <el-option v-for="item in optSizes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="适用范围" prop="size_id">
                <el-col :span="20"><el-select placeholder="請輸入" v-model="dept_ids">
                    <el-option-group v-for="group in optScopes" :key="'group' + group.id" :label="group.name">
                        <el-option :label="group.name" :value="group.id"></el-option>
                        <el-option v-for="item in group.child" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-option-group>
                </el-select></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="基础价格" prop="base_price">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model.number="form.base_price" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="合计价格" prop="total_price">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model.number="form.total_price" :maxlength="20" /></el-col>
            </el-form-item></el-col>
         </el-row>

        <el-row type="flex" justify="space-around" :gutter="2">
            <el-col :span="10"><el-form-item label="综合定价" prop="address">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model.number="form.address" :maxlength="20" /></el-col>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="总额" prop="finish_date">
                <el-col :span="20"> <el-input placeholder="請輸入" v-model.number="form.address" :maxlength="20" /></el-col>
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

        <div style="padding: 20px;"><h3>产品信息</h3> <hr /></div>
        <el-row type="flex" justify="space-around" class="title">
            <el-col :span="6" class="flex-tittle">属性名称</el-col>
            <el-col :span="6" class="flex-tittle">值</el-col>
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

        <div style="padding: 20px;"><h3>图文信息</h3> <hr /></div>

        <div style="padding: 20px;"><h4>图片管理</h4> <hr /></div>
        <el-row type="flex" justify="space-around">
            <el-col :span="20">
                <el-upload
                class="upload-demo"
                ref="upload"
                :action="action()"
                :with-credentials="withCredentials"
                :headers="headers"
                accept=".jpg,.jpeg,.png,.gif,.pdf,.JPG,.JPEG,.PBG,.GIF"
                :on-change="uploadChange"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-error="uploadError"
                :on-success="uploadSuccess"
                :file-list="fileList"   
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">请选择本地图片 尺寸400X400 为佳</div>
                </el-upload>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="20">
            <el-table v-loading="!listLoding" element-loading-text='Loading' :data='list' stripe size='medium' ref="table"
            @sort-change="sortChange" v-if="listLoding" >
                <el-table-column label="产品主图" width="400">
                    <template v-slot="scope" prop="url">
                        <el-avatar shape="square" :size="150" :src="scope.row.url"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="设否为默认选项" width="200">
                    <template v-slot="scope">
                        {{scope.row.is_default === 1 ? '是': '否'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template v-slot="scope">
                        <el-button type='text' @click='handlerSetDafault(scope.$index,scope.row)'>设为默认</el-button>
                        <el-button type='text' @click='handlerDelete(scope.$index,scope.row)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>

        <div style="padding: 20px;"><h4>图文/视频</h4> <hr /></div>
        <el-row type="flex" justify="center">
            <div class="home">
                <div id="toolbar" ref="toolbar"></div>
                <hr />
                <div id="text" ref="text" style="width: 100%; height: 500px; border: 1px solid #000;"> </div>
            </div> 
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
import wangEditor from 'wangeditor'
import { get as getAllSize } from '@/api/commodity/dimension'
import { create,update,search,scopes,allAttributes,allTypes,upImage,uploadUrl } from '@/api/commodity/product'

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
                id:'',code: '',name:'',status:'',type:'',size_id:'',base_price:'',total_price:'',actual_price:'',sort:'',creator_name:'',
                created_at:'',content:'',main_image:'', images:[]
            },
            dept_ids: [], // 使用范围，格式：[1,2,3,…]
            sku_list: [], // 产品属性 [{“attribute_id”:1, “attribute_value_id”:1, “price”:100},…]
            preform: [],
            rules: {},
            formLoading: false,
            buttonLoading: false,
            uploadUrl: "",
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
            parse.images = this.list
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
            this.getOptProperty({size_id: value, id: this.form.id})
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
        action() {
            return `${this.uploadUrl}`
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
                this.getOptProperty({size_id: res.data.size_id, id: id})
            }).catch(err => {
                this.$message.error("加载失败")
            }).finally(()=> {
                this.formLoading = false
            })
        },
        getOptType() {
            allTypes().then(res => {
                this.optType = res.data
            }).catch(err => {
                this.$message.error("加载失败")
            })
        },
        getOptScopes(id) {
            scopes({id}).then(res => {
                this.optScopes = res.data
            }).catch(err => {z
                this.$message.error("加载失败")
            })
        },
        getOptProperty({size_id, id}) {
            allAttributes({size_id, id}).then(res => {
                this.optAttribute = res.data
            }).catch(err => {
                this.$message.error("加载失败")
            })
        },
        getOptSize() {
            getAllSize().then(res => {
                this.optSizes = res.data
            }).catch(err => {
                this.$message.error("加载失败")
            })
        },
        /*--- 公共逻辑 ---*/
        initComponet() {
            this.getOptType()
            this.getOptSize()
        },
        preFormRules(refNames) {
            // 校验配置与逻辑 按时不做
            // let obj = Object.assign({},this.form)  // 一级属性深拷贝，二级属性浅拷贝，相同属性后盖前
            // let preObj = [];
        },
        getEditorData() {
        // 通过代码获取编辑器内容
            let data = this.editor.txt.html()
            this.form.content = data
            console.log('通过代码获取编辑器内容',this.form.content,data);
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
        this.headers = {"Authorization": this.$store.getters.token}
        this.uploadUrl = `${uploadUrl}/admin/product/upload`
        this.initComponet()
        if (this.data_rigin) {
            this.form.id = this.data_rigin
            this.getDataForm(this.data_rigin)
        }
        this.getOptScopes(this.data_rigin)
    },
    mounted() {
        const editor = new wangEditor('#toolbar', '#text')
        const token =  this.$store.getters.token
        // console.log("text",this.$refs.text, document.querySelector('#text')) // true
        editor.config.onchange = (html) => {
            this.form.content = editor.txt.html()
            // console.log('通过代码获取编辑器内容',this.form.content);
        }

        editor.config.uploadImgServer = `${uploadUrl}/admin/product/upload`
        editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp']
        editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片
        editor.config.uploadImgParamsWithUrl = false
        editor.config.uploadFileName = 'file' // 发送数据的字段名 file: binary.
        editor.config.uploadImgHeaders = { "Authorization": token }
        editor.config.uploadImgHooks = {
            // 上传图片之前
            before: (xhr) => console.log(xhr),
            // 图片上传并返回了结果，图片插入已成功
            success: (xhr) => console.log('success', xhr),
            // 图片上传并返回了结果，但图片插入时出错了
            fail: (xhr, editor, resData) => console.log('fail', resData),
            // 上传图片出错，一般为 http 请求的错误
            error: (xhr, editor, resData) => console.log('error', xhr, resData),
            // 上传图片超时
            timeout: (xhr) =>  console.log('timeout'),
            // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
            customInsert: function(insertImgFn, result) {
                insertImgFn(result.data.url)
            }
        }
        editor.config.uploadVideoServer = `${uploadUrl}/admin/product/upload`
        editor.config.uploadVideoMaxSize = 10 * 1024 * 1024 // 10M
        editor.config.uploadVideoAccept = ['mp4']
        editor.config.uploadVideoParamsWithUrl  = false
        editor.config.uploadVideoName = 'file'
        editor.config.uploadVideoHeaders = { "Authorization": token }
        editor.config.uploadVideoHooks = {
            // 上传图片之前
            before: (xhr) => console.log(xhr),
            // 图片上传并返回了结果，图片插入已成功
            success: (xhr) => console.log('success', xhr),
            // 图片上传并返回了结果，但图片插入时出错了
            fail: (xhr, editor, resData) => console.log('fail', resData),
            // 上传图片出错，一般为 http 请求的错误
            error: (xhr, editor, resData) => console.log('error', xhr, resData),
            // 上传图片超时
            timeout: (xhr) =>  console.log('timeout'),
            // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
            customInsert: function(insertVideoFn, result) {
                insertVideoFn(result.data.url)
            }
        }
        // editor.config.withCredentials = true // 携带cookie
        // editor.config.withVideoCredentials = true
        editor.create() // 创建编辑器
        this.editor =  editor
        //   $text1.val(editor.txt.html())
    },
    beforeDestroy() {
        // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy()
        this.editor = null
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

.home {
    width: 100%;
    margin: auto;
}
</style>