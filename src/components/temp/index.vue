<template>
 <div>
   <!-- 只负责通信 -->
   <Table :getList="getList" :feldName="feldName" />
   <Pagination />
 </div>
</template>

<script>

import Table from '@/components/table'
import Pagination from '@/components/pagination'

 export default {
  components: {
      Table,
      Pagination
  },
  props: {
    getList: Function,
    feldName: Array
  },
  created() {
    console.log("组件：",this.getList,this.feldName);
  }
    
 }
</script>

<style scoped>

</style>