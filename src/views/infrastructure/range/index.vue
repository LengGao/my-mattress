<template>
 <div class="range">
     <div v-show="!pageChange">
    <el-form inline label-width="100px" :model="form">
         <el-form-item>
             <el-input placeholder="城市" v-model="form.city" />
         </el-form-item>
         <el-form-item>
             <el-input placeholder="状态" v-model="form.status" />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="add">添加区域信息</el-button>
         </el-form-item>
     </el-form>
     <el-table v-loading="listLoading" element-loading-text="Loading"
      border fit oode-key="id" row-key="id"
      :data="list" :tree-props="{children: 'child'}" >
        <el-table-column label="ID" prop="id">
            <template slot-scope="scope">   
                {{scope.row.id}}
            </template>
        </el-table-column>
        <el-table-column label="节点" prop="name">
        </el-table-column>
        <el-table-column label="父节点"  prop="parent_id">
        </el-table-column> 
        <el-table-column label="类型">
            <template slot-scope="scope">
                {{scope.row.type === 1 ? '省/直辖市' : (scope.row.type === 2? '市' : '区/县')}}
            </template>
        </el-table-column>
        <el-table-column label="城市级别">
            <template slot-scope="scope">
                {{scope.row.grade}}
            </template>
        </el-table-column>
        <el-table-column label="排序">
            <template slot-scope="scope">
                {{scope.row.sort}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.$index, scope.row,scope)">编辑</el-button>
                <el-button type="text" @click="dele(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
     </el-table>
     <div class="block" style="display: flex; align-items: center;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper "
        :total="total">
        </el-pagination>
        <el-button type="parimary" round size="mini">确定</el-button>
     </div>
     </div>
    <Deputy :type="type" v-show="pageChange" v-on:changPage="changPage()"/>
    
 </div>
</template>

<script>
// 区域管理
import Deputy from './modify'
import { getListcerateRage,deleteRage,updateeRage,searchRage,getRage,allRage,banRage } from '@/api/infrastructure/range'
 export default {
    components: {
        Deputy
    },
    data() {
        return{
            list: [],
            listLoading: true,
            pageSize: 20,
            total: 0,
            currentPage: 1,
            pageChange: false,
            type: '',
            form: {
                city: '',
                status: null,
            },
        }
    },
    created() {
        this.fetchData()
        console.log('process.env.VUE_APP_BASE_API',process.env.VUE_APP_BASE_API);
    },
    methods: {

        hasChild (arr) {
            arr.forEach((item)=>{
                if (item.child) {
                    item.hasChildren = true
                    this.hasChild(item.child)
                }
            })
            return arr
        },
        // load(tree, treeNode, resolve) {
        //     console.log('tree',tree,'treeNode',treeNode);
        //     setTimeout(() => {
        //     resolve(
        //      [
        //         {
        //             "id": 2,
        //             "name": "合肥",
        //             "parent_id": 1,
        //             "type": 2,
        //             "status": 1,
        //             "sort": 0,
        //             "grade": null,
        //             "child": [{
        //                 "id": 3,
        //                 "name": "瑶海",
        //                 "parent_id": 1,
        //                 "type": 2,
        //                 "status": 1,
        //                 "sort": 0,
        //                 "grade": null,
        //             }]
        //         }
        //     ]
        //         )
        //     }, 1000)
        // },
        fetchData() {
            this.listLoading = true
            searchRage().then(response => {
                // if(Array.isArray(response.data)) this.hasChild(response.data)
                // this.list =  Array.isArray(response.data) ? this.hasChild(response.data) : response.data
                 this.list =  response.data
                // console.log("list",this.list,response.data);
                this.listLoading = false
                // this.total = response.data.total
            })
        },
        edit(index, row,scope) {
            console.log("scope",scope);
            console.log(`edit`,index,row);
            this.type = 'edit' 
            this.changPage()
        },
        dele(index,row) {
            console.log(`dele`,index,row);
            const ids = row.id || this.ids;
            var title = '确顶要删v除吗？',
                option= {cancelButtonText: '取消',confirmButtonText: '确定',type: 'warning'}
            this.$confirm(title,option).then(res => {
                this.$message({type: 'success',message: '删除成功!'});
                this.list.splice(index,1) // 逻辑删除
                // request 物理删除
            }).catch(err => {
                 this.$message({type: 'info',message: '已取消删除'});
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val
            // request
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            // request
        },
        changPage() {
            this.pageChange = !this.pageChange;
        },
        search() {
            console.log("查询",this.form);
        },
        add() {
            this.type = 'add'
            this.changPage()
        }
    }
 }
</script>

<style scoped>

</style>