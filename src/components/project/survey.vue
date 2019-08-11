<template>
  <div class="survey_content">    
    <headers :header="header" :name="name"></headers>
    <div class="contents">
      <div class="one clearfix">
        <div class="oneName clearfix">{{one.name}}</div>
        <div class="oneContent">{{one.body}}</div>
        <img class="oneImg" src='@/assets/images/wushan.jpg'>
      </div>
      <hr>
      <div class="two">
        <div class="twoML clearfix">目录</div>
        <ul class="twoUL">          
          <li><a href="">项目文档</a></li>
          <li><a href="">项目表格</a></li>
          <li><a href="">项目图形</a></li>
          <li><a href="">项目图片</a></li>
        </ul>
      </div>
      <hr>
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
      name:'项目简介'
    }
  },
  created(){
    this.header=consts.getHeaderConfig('survey')
    this.contens=Contents.getContent('survey')
    this.one=this.contens.one
  },
}
</script>

<style lang="less" scoped>
@import '../../../static/css/clear';
@import '../../../static/css/common';
.survey_content{
  width: 99.5%;
  height: 100%;
  .contents{
  background-color: #fff;
  margin: 15px;
  padding: 15px;
  }
  .one{
    position: relative;
    text-align: left;
    height: 270px;
    background-color: #fff;
    .oneName{ 
      position: absolute;
      left: 0px;     
      font-size: 20px;
    }
    .oneContent{
      position: absolute;
      top: 50px;
      width: 35%;
      font-size: 14px;
    }
    .oneImg{
      position: absolute;
      width: 45%;
      height: 270px;
      right: 30px;
      opacity: 0.8;
    }
  }
  .two{
    position: relative;
    text-align: left;
    height: 110px;
    background-color: #fff;
    display: table;
    width: 100%;
    .twoML{
      font-size: 20px;
      width: 50px;
      position: absolute;
      left: 20px;
      top:35%;
    }
    .twoUL{
      position: absolute;
      margin-left: 60px;

    }
  }
}

</style>
