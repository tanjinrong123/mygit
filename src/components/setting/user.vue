<template>
<div class="survey_content2 clearfix">
  <el-button class='right' type="success" size="small" @click='add'>添加用户</el-button>
  <div class="contents clearfix">    
    <el-table
    :data="tableData"
    style="width: 100%" 
    :default-sort = "{prop: 'ID', order: 'ascending'}"   
    >
    <el-table-column
      prop="ID"
      label="ID"
      sortable
      width="80"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名称"
    >
    </el-table-column>
    <el-table-column
      prop="role"
      label="用户角色">
    </el-table-column>
    <el-table-column
      prop="group"
      label="用户分组">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="用户电话"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="用户邮箱"
    >
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
    >
    </el-table-column>
    <el-table-column
      prop="add"
      label="创建时间"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="change"
      label="修改时间"
      sortable
    >
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
        <el-button
          size="mini"
          type="warning"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <!-- <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">分配
        </el-button> -->
      </template>
    </el-table-column>
  </el-table>
  </div>
  <el-dialog title="角色创建" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item required label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item required label="角色描述" :label-width="formLabelWidth">
        <el-input
          v-model="form.info"
          type="textarea"
          :rows="3"
          placeholder="请输入内容">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>  
</div>
  
</template>

<script>
  export default {
    data() {
      return {
      tableData: [{
        ID:'1',
          name:'tjr',
          role:'超级管理员',
          group:'教研室1',
          tel:'18829065749',
          email:'tanjinrong123@foxmail.com',
          status:'有效',
          add: '2019-10-01',
          change: '2019-10-02'
        }, { ID:'2',
          name:'teach',
          role:'管理员',
          group:'教研室1',
          tel:'18223333355',
          email:'',
          status:'有效',
          add: '2019-10-01',
          change: '2019-10-02'
        }, { ID:'3',
          name:'张博',
          role:'普通用户',
          group:'教研室2',
          tel:'18829434749',
          email:'',
          status:'有效',
          add: '2019-11-01',
          change: '2019-11-02'
        }, { ID:'4',
          name:'王伟',
          role:'普通用户',
          group:'教研室2',
          tel:'18333335555',
          email:'',
          status:'有效',
          add: '2019-11-01',
          change: '2019-11-02'
        },
         { ID:'5',
          name:'李四',
          role:'普通用户',
          group:'教研室3',
          tel:'17687899098',
          email:'',
          status:'失效',
          add: '2019-11-01',
          change: '2019-11-02'
        },
         { ID:'6',
          name:'方法',
          role:'普通用户',
          group:'教研室3',
          tel:'17687899098',
          email:'',
          status:'失效',
          add: '2019-11-01',
          change: '2019-11-02'
        },
         { ID:'7',
          name:'李四个',
          role:'普通用户',
          group:'教研室3',
          tel:'17687899098',
          email:'',
          status:'失效',
          add: '2019-11-01',
          change: '2019-11-02'
        }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '100px'      
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      // 删除
      handleDelete(index, row) {
        console.log(index, row);
        if(index===0){
          this.$message({
          message: '超级管理员不可以删除',
          type: 'error'
          });
          return
        }
        this.tableData.splice(index,1)
      },
      // 创建角色
      add(){
        this.dialogFormVisible=true
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../../static/css/clear';
@import '../../../static/css/common';
.survey_content2{
   width: 99.5%;
  // height: 100%;
  .body{
    height: 100%;
  }
  .contents{
  background-color: #fff;
  // background-color: rgb(198, 219, 212);
  margin: 60px 20px;
  padding: 15px;
  height: 100%;
  }
  .right{
    // height: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
  }

}
</style>

