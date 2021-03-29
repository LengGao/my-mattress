<template>
 <div class="edit">
     <el-header>
       {{type==='add'? '添加地区信息': '编辑地区信息'}} 
       <i @click="ctrl()" class="el-icon-circle-close" style="font-size: 28px;"></i>
     </el-header>
    <el-form label-width="120px"  :model="form">
        <el-form-item label="市/区">
            <el-select v-model="form.city">
                <option value="">请选择</option>
                <option value="广州">广州</option>
            </el-select>
        </el-form-item>
        <el-form-item label="僧">
            <el-select v-model="form.province">
                <option value="">请选择</option>
                <option value="广东">广东</option>
            </el-select>
        </el-form-item>
        <el-form-item label="城市等级">
            <el-select v-model="form.cityLevel">
                <option value="">请选择</option>
                <option value="S">S</option>
                <option value="A">A</option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-checkbox v-model="form.isUse">启用</el-checkbox>
        </el-form-item>
        <el-form-item label="创建人">
            <el-input placeholder="创建人" v-model="form.founder" />
        </el-form-item>
        <el-form-item label="创建时间">
            <el-input placeholder="创建时间" v-model="form.dateTime" />
        </el-form-item>
        <el-form-item>
            <el-button v-if="type ==='add'"  type='primary' @click="addUp">添加</el-button>
            <el-button v-else type='primary' @click="editUp">修改</el-button>
            <el-button type='info' @click="ctrl">取消</el-button>
        </el-form-item>

    </el-form>
 </div>
</template>

<script>
 export default {
     props: {
         type: String
     },
     data() {
         return {
             form: {
                city: '',
                province: '',
                cityLevel: '',
                sot: '',
                isUse: false,
                founder: '',
                dateTime: '',
             },
         }
     },
     methods: {
        ctrl() {
            console.log("t");
            this.$emit('changPage')
        },
        addUp() {
            console.log("添加");
        },
        editUp() {
            console.log("修改");
        }
     }
 }
</script>

<style scoped>
.edit {
    z-index: 99999;
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #B3C0D1;  
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>