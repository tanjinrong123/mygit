<template>
<div class="survey_content2 clearfix">
  <el-button class='right' type="success" size="small" @click='add'>添加角色</el-button>
  <div class="contents clearfix">    
    <el-table
    :data="tableData"
    style="width: 100%"    
    >
    <el-table-column
      prop="name"
      label="角色名称"
      >
    </el-table-column>
    <el-table-column
      prop="info"
      label="角色描述">
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
    <el-table-column label="操作">
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
          <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">分配
        </el-button>
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
          name:'superAdmin',
          info:'超级管理员',
          add: '2019-10-01',
          change: '2019-10-02'
        }, {
          name:'admin',
          info:'管理员',
          add: '2019-10-01',
          change: '2019-10-02'
        }, {
          name:'user1',
          info:'普通用户1',
          add: '2019-11-01',
          change: '2019-11-02'
        }, {
          name:'user2',
          info:'普通用户2',
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

