<template>
 <div class="app-container">
     <Temp :getList='getList' :feldName='feldName' />
  <el-select
    v-model="value"
    value-key="id"
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item">
    </el-option>
  </el-select>
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
            options: [{
              id: 1,
            value: 'HTML',
            label: 'HTML'
            }, {
              id: 2,
            value: 'CSS',
            label: 'CSS'
            }, {
              id: 3,
            value: 'JavaScript',
            label: 'JavaScript'
            }],
            value: '1',
            getList: getList,
            feldName: ['id','title','author','display_time','pageviews']
        }
    }

 }
</script>

<style scoped>

</style>