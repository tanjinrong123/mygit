<template>
<!-- 圆饼图 -->
  <div class="x-bar flex-align-center">
    <div :id="id"
    :option="options" style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'

export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    options: [Object],
  },
  watch: {
    options(v) {
      console.log(v);
      this.init()
    }
  },
  mounted(){
    this.init()
    // console.log(this.options,89);
  },
  methods:{    
    init () {
      // this.setGlop()
      let chartInstance = this.highCharts || HighCharts
      this.chart = new chartInstance.Chart(this.$el, this.options, function(c) {})
    }
  }
}
</script>

<style lang="less" scoped>
.x-bar {
  padding: 40px;
  box-sizing: border-box;
  width: 100%;
}
</style>
