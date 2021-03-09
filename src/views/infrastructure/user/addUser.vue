 <template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules" hide-required-asterisk>
      <el-form-item v-for="item in preForm" :key="item.feild" :label="item.label"> 
        <template v-if="item.type === 'prefetchSelect'">
          <el-select v-model="form[item.feild]">
              <el-option v-for="(option,index) in [item.options]" :key="index" ></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'date'">
          <el-date-picker type="date" placeholder="选择日期" v-model="form[item.feild]" style="width: 100%;"></el-date-picker>
        </template>
        <template v-else>
          <el-input v-model="form[item.feild]"></el-input>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getUser, updateUser} from '@/api/infrastructure/user'
let deptSelect = [{id: 0,value: 0,label:'销售部'}], // 部门
    roleSelect = [{id: 1,value: 0,label: '经理'}], // 橘色
    gender = [{value: 0,label: '未知'},{value: 1,label: '男'},{value: 3,label:'女'}]  // 性别
export default {
  props: ['type','id'],
  watch: {
    type: {
      handler: 'judgeType',
      immediate: true
    }
  },
  data() {
    return {
      form: {},
      preForm: [
        {label: '员工姓名：',value:'',feild:'name',type:'input'},
        {label: '员工编号：',value:'',feild:'id',type:'input'},
        {label: '员工手机：',value:'',feild:'phone',type:'input'},
        {label: '员工部门：',value:'',feild:'dept',type:'prefetchSelect',options: deptSelect},
        {label: '员工角色：',value:'',feild:'role_name',type:'prefetchSelect',options: roleSelect},
        {label: '员工性别：',value:'',feild:'gender',type:'prefetchSelect',options: gender},
        {label: '入职时间：',value:'',feild:'entry_time',type:'date'},
        {label: '员工邮箱：',value:'',feild:'email',type:'input'},
        {label: '离职时间：',value:'',feild:'leave_time',type:'date'},
        {label: '身份证号：',value:'',feild:'id_card_no',type:'input'}
      ],
      rules: {
        name: [{required: true,message: '请输入员工姓名',trigger: 'blur'}],
        id: [{required: true,message: '请输入员员工编号',trigger: 'blur'}],
        phone: [{required: true,message: '请输入手机号码',trigger: 'blur'}],
        dept: [{required: true,message: '请输入部门名称',trigger: 'blur'}],
        role_name: [{required: true,message: '请输入角色名称',trigger: 'blur'}],
        entry_time: [{required: true,message: '请输入入职时间',trigger: 'blur'}],
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    hasRquired(feild) {
      var valiFeild = ['gender','email','leave_time','id_card_no',]
      return !valiFeild.some(val => val === feild)
    },
    judgeType() {
      console.log('type',this.type);
      if(this.type === 'edit') this.fetchData(this.id)
    },
    fetchData(id) {
      getUser(id).then(res => {
        this.form = res.data
      }).then(res => {
        // 部门  // 角儿  //性别
      })      
    }
  },
  beforeMount() {
    console.log("oprpo",this.type);  // watcher先
  }

}
</script>

<style scoped>
.line{
  text-align: center;

}

</style>

