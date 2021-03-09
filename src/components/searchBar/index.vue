<template>
 <div class="">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    

    <el-form-item  v-for="(formItem,index) in formItemArray" :key="index" :="formItem.label">
        {{this}}
    </el-form-item>
    <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <slot name="one" v-bind:user="user">
        {{user.lastName}}  ///
    </slot>
    <slot name="two">
    </slot>
    </el-form>
<!--     
    <slot v-bind:user="user">
        {{ user.lastName }}
    </slot> -->
 </div>
</template>

<script>

 export default {
    name: 'SearchBar',
    props: {
        formItemArray: Array,
        eventArray: Array
    },
    data () {
      return {
        formInline: {
          user: '',
          region: ''
        },
        user: {
            firstName: 'z',
            lastName: 'c'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!',this,this.$component,this.$options);
      }
    }
 }
</script>

<style scoped>

</style> 

