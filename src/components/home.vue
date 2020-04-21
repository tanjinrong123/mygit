<template>
  <div class="report_continer">
    <!-- <header-top/> -->
    <div class="body">
        <sider/>
        <!-- <el-scrollbar class="page-component__scroll" :style="{ paddingLeft: movePadding }"> -->
        <div :class="showMenu?'content left1':'content left2'">
            <router-view></router-view>
        </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import Sider from './common/sider'
import Header from './common/header'
export default {
  components: {
    Sider,
    Header
  },  
  data() {
    return {
      box: '',
      homeTop: ''
    }
  },
  computed:{
    showMenu(){
      return this.$store.state.menu.showMenu
    },
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.report_continer {
  width:100%;
  height: 100%;
  .body {
    display: flex;
    // height: auto;
    height: 100%;
    .content{
      width: 100%;      
      background-color: rgb(238, 235, 235);
      // height: 100%;
    }
    .left1{
      padding-left: 142px;
    }
    .left2{
      padding-left: 15px;
    }
  }
}
</style>