<template>
 <div class="app-container">
     <Temp :getList='getList' :feldName='feldName' />
 </div>
</template>

<script>
// 测试页面
import { getList } from '@/api/table'
import Temp from '@/components/temp'
 export default {
    components: {
        Temp
    },
    data () {
        return {
            getList: getList,
            feldName: ['id','title','author','display_time','pageviews']
        }
    }

 }
</script>

<style scoped>

</style>