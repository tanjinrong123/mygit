<template>
  <div id="app">    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '../static/css/clear';
@import '../static/css/common';
#app {  
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
.clearfix:after{visibility:hidden;display:block;font-size:0;content: " ";clear:both;height:0;}
// .clearfix{*zoom:1;}
// .clearfix:after {
//   content: "";
//   display: block;
//   visibility: hidden;
//   clear: both;
//   height: 0;
// }
.clearfix {
  zoom: 1; /* 为了照顾ie6浏览器*/
}
</style>
