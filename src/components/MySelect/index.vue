<template>
    <el-select v-bind="$attrs" v-on="$listeners">
        <el-option :value="0" label="前选择"></el-option>
        <el-option v-for="(item,$index) in data" :key="$index" :label="item.label" :value="item.value" :disabled="item.disabled ? item.disabled : false" >
        </el-option>
        <!-- 传属性，$emit，.native -->
    </el-select>
</template>

<script>
 export default {
     name: 'my-select',
     inheritAttrs: false,
     props: {
         data: {type: Array || Function, require: false},
         optionBlur: {type: Function, require: false, default: function() {} },
         optionFocus: {type: Function, require: false, default: function() {} },
         optionClick: {type: Function, require: false, default: function() {} },
     },
     mounted() {
        console.log("mySelect:",this.data,this.$attrs,this.$listeners);
     }
 }
</script>

<style scoped>

</style>