<template>
  <div class="survey_content2 clearfix">    
    <headers :header="header" :name="name"></headers>
    <div class="contents clearfix">
      <div class="imgScroll">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(item,index) in imgList" :key="index">
            <img class="imgs" :src='item.url'>
          </el-carousel-item>
        </el-carousel>
      </div>
      <hr>
      <div class="table">
        <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        border
        size="small"
        :header-cell-style="{background: 'rgb(138, 199, 179,0.2)'}"
        @selection-change="handleSelectionChange"
         :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">          
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="format"
          label="格式"
          :filters="[{ text: 'doc', value: 'doc' }, { text: 'pdf', value: 'pdf' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入影像关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">下载</el-button>
            <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import * as consts from '../../common/const'
import * as Contents from '../../common/content'

export default { 
  data(){
    return{
      header:[],
      contens:{},
      one:{},
      tableData:[],
      tableHeader:[{id:0,value:'name',label:'名称'},{id:1,value:'date',label:'修改时间'},{id:2,value:'format',label:'格式'}],
      multipleSelection:[],
      search:'',
      currentPage:1,
      name:'项目图片',
      imgList:[
        {url:require('@/assets/images/1.jpg')},
        {url:require('@/assets/images/2.jpg')},
        {url:require('@/assets/images/3.jpg')},
        {url:require('@/assets/images/4.jpg')},
        {url:require('@/assets/images/5.jpg')},
      ]
    }
  },
  created(){
    this.header=consts.getHeaderConfig('img')
    // this.contens=Contents.getContent('graph')    
    this.one=this.contens.one
    this.getTableData()
  },
  methods:{
    // 获取表格列表
    getTableData(){
      this.tableData=Contents.imgTable
    },
    // 删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterTag(value, row) {
      return row.format === value;
    },
    // 分页
     handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/css/clear';
@import '../../../static/css/common';
.clearfix{*zoom:1;}
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
}
.survey_content2{
   width: 99.5%;
  height: 100%;
  .contents{
  background-color: #fff;
  margin: 15px;
  padding: 15px;
  .table{
    position: relative;
    margin-top: 20px;
  }
  .imgScroll{
    position: relative;
    height: 330px;
    .imgs{
      width: 100%;
      height: 100%;
    }
  }
  
  }
  
  
}

</style>
<style>
.el-checkbox__label{
  font-size: 12px;
  line-height: 12px;
}
</style>

