<template>
 <div>
     <el-form>
         <el-form-item  v-for="(item,index) in preForm" :key="index" :label="item.label">
             
         </el-form-item>

     </el-form>

 </div>
</template>

<script>
 export default {
    name: 'modify',
    data() {
        return {
            form: {},
            preForm: [
                {label: '尺寸名称',key: '',type: ''},
                {label: '标准长度cm',key: '',type: ''},
                {label: '标准宽度cm',key: '',type: ''},
                {label: '标准厚度cm',key: '',type: ''},
                {label: '长度范围cm（含下限）',key: '',type: ''},
                {label: '宽度范围cm（含下限）',key: '',type: ''},
                {label: '厚度范围cm（含下限）',key: '',type: ''},
                {label: '是否启用',key: '',type: ''},
                {label: '创建人',key: '',type: ''},
                {label: '创建时间',key: '',type: ''}
            ]
        }
    },
    // props: ['pageChange']

 }
</script>

<style scoped>

</style>