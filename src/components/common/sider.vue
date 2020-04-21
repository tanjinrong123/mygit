<template>
  <div class="sider">    
    <div @click="showMenus()" class="sum"> 
      <i class="iconfont icon-liebiao navi "></i>
    </div>  
    <div class="navigator" v-if="showMenu">
      <el-menu 
        router
        :default-active="$route.name"
        class="el-menu-vertical-demo"
        text-color="#fff"
        background-color="#8AC7B3"
        active-text-color="#ffd04b">
        <div class="ava"> 
          <img class="avator" src='@/assets/images/bo.jpg'>
        <div class="avatorBtn btns" @click='backIndex()'>主页</div>
        <div class="avatorBtn" @click='backLogin()'>退出</div>
        </div>
        <label v-for="item in menu"  :key="item.titleIndex">
          <el-submenu :index="item.titleIndex">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <template v-for="ele in item.levelInfo">
              <el-menu-item v-if="!ele.levelInfo"  @click.native="changeTitle(ele.levelIndex)" 
            :index="ele.levelIndex" :key="ele.levelIndex" :route="ele.path">{{ele.level}}
            </el-menu-item> 
            <el-submenu  v-else :index="ele.titleIndex">
              <template slot="title">{{ele.level}}</template>
              <el-menu-item v-for="data in ele.levelInfo"  @click.native="changeTitle(data.levelIndex)" 
            :index="data.levelIndex" :key="data.levelIndex" :route="data.path">{{data.level}}
            </el-menu-item> 

              </el-submenu>

            </template>
                      
          </el-submenu>
        </label>
      </el-menu>
    </div>
  </div>
</template>

<script>
import * as consts from '../../common/const'

export default {
  data(){
    return{
      // showMenu:true,
      menu:{},
    }
  },
  created(){
    this.getMenu()
  },
  computed:{
    showMenu: {
    // getter
    get: function(){
      return this.$store.state.menu.showMenu
    },
    // setter
    set: function(v){
      this.$store.state.menu.showMenu=v
    }
    },
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
      // 点击退出，返回到登录页面
      backLogin(){
        this.$router.push({name:'login'})
      },
      backIndex(){
        this.$router.push({name:'index'})
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
  .sum{
    position: fixed;
    top: 10px;
    left: 6px;
    width: 23px;
    height: 23px;
    z-index:999;
  }
   .navi{
    color: #999;
    font-size: 20px;
    
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
        top:10px;
        left: 40px;
        border-radius: 50%;
      }
      .avatorBtn{
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }
      .btns{
         bottom: 50px;
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
  font-size: 14px;
}
.el-menu--inline .el-submenu__title{
   font-size: 14px;
}

}

</style>
<style>
 .el-submenu .el-submenu__title{
  margin-left: -40px;  
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

