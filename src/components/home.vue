<template>
  <div class="report_continer">
    <!-- <header-top/> -->
    <div class="body">
        <sider/>
        <!-- <el-scrollbar class="page-component__scroll" :style="{ paddingLeft: movePadding }"> -->
        <div class="content">
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
  computed: {
    movePadding() {
      // return parseInt(this.$store.state.continer_left) + 'px'
    }
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
    height: auto;
    .content{
      width: 100%;
      padding-left: 142px;
      background-color: rgb(238, 235, 235);
      // height: 100%;
    }
  }
}
</style>