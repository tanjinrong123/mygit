<template>
  <div class="sider">    
    <div @click="showMenus()"> 
      <i class="iconfont icon-liebiao navi "></i>
    </div>  
    <div class="navigator" v-if="showMenu">
      <el-menu 
        router
        default-active="1"
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="#8AC7B3"
        active-text-color="#fff">
        <div class="ava">          
          <div class="avator">
            <image src='src/assets/images/bo.jpg'></image>
          </div>
        <div class="avatorBtn" >退出</div>
        </div>        
        <el-submenu :index="item.titleIndex" v-for="item in menu"  :key="item.titleIndex">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item @click.native="changeTitle(route_keys.levelIndex)" v-for="route_keys in item.levelInfo" 
          :index="route_keys.levelIndex" :key="route_keys.levelIndex" :route="route_keys.path">{{route_keys.level}}
          </el-menu-item>           
        </el-submenu>        
      </el-menu>
    </div>
  </div>
</template>

<script>
import * as consts from '../../common/const'

export default {
  data(){
    return{
      showMenu:true,
      menu:{},
    }
  },
  created(){
    this.getMenu()
  },
  methods:{
     // 导航栏显示与否
      showMenus(){
        this.showMenu=!this.showMenu
      },
      // 获取导航栏
      getMenu(){
        this.menu=consts.ASIDE_TITLE
        // this.projects=this.menu.project
      },
      changeTitle(){}
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/css/clear';
@import '../../../static/css/common';
.sider{
  // position: relative;
  // float: left;
  // width:160px;
  // flex: 0.1;
  height:100%;
   .navi{
    position: absolute;
    left: 10px;
    top: 10px;
    // width: 30px;
    font-size: 20px;
    background: rgba(185, 184, 184, 0.8);
    z-index: 2;
  }
  .navigator{ 
    position: fixed;
    top:0;
    bottom: 0;
    z-index: 99;
    overflow: hidden;
    height: 100%;
    .ava{
      border-bottom: 0.5px solid #fff;
      position: relative;
      width: 100%;
      height: 80px;
      .avator{
        position: absolute;
        width: 60px;
        height: 60px;
        background-color: red;
        margin: 10px 40px;
        border-radius: 50%;
      }
      .avatorBtn{
        position: absolute;
        right: 30px;
        bottom: 10px;
        font-size: 12px;
        color: #fff;
      }
    }    
  } 

  .el-submenu div:hover{
  background-color: #46988efa;
}
.el-menu-item-group li:hover{
  background-color: #46988efa;
}
.el-menu-item-group__title{
  padding: 0px;
}
.el-submenu .el-menu-item {
  height: 35px;
  line-height: 35px;
  min-width: 0px;
  color: #71a8e0;
  font-size: 12px;
}
.el-menu--inline .el-submenu__title{
   font-size: 14px;
}

}

</style>
<style>
 .el-submenu .el-submenu__title{
  margin-left: -60px;  
}
.el-submenu__title i{
  color: #fff;
}
.el-submenu .el-menu-item {
  padding:0px;
  padding-left: 0 !important;
}
.el-menu{
  width: 142px;
  height: 100%;
}
</style>

