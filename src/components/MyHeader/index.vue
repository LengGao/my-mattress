<template>
 <div class="app-header">
    <div>&nbsp;&nbsp;</div>
    <div>{{ mtitle }}</div>
    <el-button type="primary" v-on="$listeners" >返回</el-button>
 </div>
</template>

<script>
 export default {
    name: 'my-header',
    inheritAttrs: false,
    props: ['mtitle'],
 }
</script>

<style scoped>
.app-header {
   width: 100%;
   height: 60px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 0 10px;
   background: linear-gradient(to right, #243949 0%, #517fa4 100%);
}
</style>