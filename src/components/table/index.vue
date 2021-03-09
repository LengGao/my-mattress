<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading" element-loading-text="Loading" :data="list"
      border fit highlight-current-row >
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> -->
      <el-table-column v-for="(val,index) in feldName" :key="index" :label="val">
        <template slot-scope="scope">
          {{ scope.row[val] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    getList: Function,
    feldName: Array
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    console.log("table：",this.getList,this.feldName);
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
