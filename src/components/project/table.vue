<template>
  <div class="survey_content2 clearfix">    
    <headers :header="header" :name="name"></headers>
    <div class="contents clearfix">
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
              placeholder="输入项目关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
            <a class="download" :href="downLoadUrl"  download="" @click='downLoad()'>下载</a>
            <el-button type="text" size="small"  @click="deleteRow(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="preview" v-if="showPreview">
      <div class="close" @click='close()'>x</div>
      <iframe class="iframe" src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' frameborder='1'>
      </iframe>
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
      name:'项目表格',
      showPreview:false,
      downLoadUrl:''
    }
  },
  created(){
    this.header=consts.getHeaderConfig('table')
    this.contens=Contents.getContent('table')
    
    this.one=this.contens.one
    this.getTableData()
  },
  methods:{
    // 获取表格列表
    getTableData(){
      this.tableData=Contents.excelTable
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
    // 查看预览文档
    look(){
      this.showPreview=true
    },
    // 关闭预览
    close(){
      this.showPreview=false
    },
    // 下载文档
    downLoad(){
      this.downLoadUrl=''
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
  // background-color: rgb(198, 219, 212);
  margin: 15px;
  padding: 15px;
  }
  
.preview{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #ebeef5;
  .iframe{
    position: absolute;
    width:95%;
    height:90%;
    top:40px;
    left:40px;
  }
  .close{
    position: absolute;
    font-size: 40px;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 40px;
    background-color: rgb(48, 47, 47,0,8);
    color: #fff;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
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

