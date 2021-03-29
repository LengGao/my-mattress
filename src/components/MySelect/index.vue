<template>
    <el-select v-bind="$attrs" v-on="$listeners" :value="$attrs.value | lengal" >
        <template v-for="(item,$index) in data">
        <el-option :key="$index" :label="item.label" :value=" item.value" :disabled="item.disabled ? item.disabled : false" >
        </el-option>
        </template> 
        <!-- 传属性，$emit，.native -->
    </el-select>
</template>

<script>
 export default {
     name: 'my-select',
     inheritAttrs: false,
     props: {
         data: {type: Array, require: false},
         fetch: {type: Function, require: false},
         optionBlur: {type: Function, require: false, default: function() {} },
         optionFocus: {type: Function, require: false, default: function() {} },
         optionClick: {type: Function, require: false, default: function() {} },
     },
     filters: {
         lengal: function (val) { return val === 0 ? '' : val }
     },
     fetchData() {
        this.fetch().then(res => this.data = res.data.list || res.data)
        .catch(err => console.log("option拉取失败",err.msg)) 
     },
     created() { 
        console.log("mySelect created:",this.data,this.$attrs,this.$listeners);
        this.fetch && this.fetchData()
     },
     mounted() {
        console.log("mySelect mounted:",this.data,this.$attrs,this.$listeners);
     }
 }
</script>

<style scoped>

</style>