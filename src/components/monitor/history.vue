<template>
  <div class="survey_content2 clearfix">
    <headers :header="header"
             :name="name"></headers>
    <div class="contents clearfix">
      <div class="grahp">
        <div class="grahps">
          <component :is="page.oneChart"
                     id="chart"
                     v-loading="loading.chartLoading"
                     element-loading-background="#FFF"
                     element-loading-spinner="el-icon-loading"
                     element-loading-customClass="defineLoading"
                     element-loading-text="拼命的加载中"
                     :options="option">
          </component>
        </div>
      </div>
      <hr>
      <el-table :data="tableData"
                border
                size="small"
                :header-cell-style="{background: 'rgb(138, 199, 179,0.2)'}">
        <el-table-column prop="date"
                         label="SW01">
        </el-table-column>
        <el-table-column v-for="(item,index) in tableHeader"
                         :key="index"
                         :prop="item.value"
                         :label="item.label">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as consts from "../../common/const";
import * as Contents from "../../common/content";
import * as Points from "./points";

export default {
  components: {
    HighChart: () => import("../common/chart/highchart")
  },
  data() {
    return {
      header: [],
      contens: {},
      one: {},
      tableData: [],
      tableHeader: [{ id: 0, value: "value", label: "地下水位(m7)" }],
      multipleSelection: [],
      search: "",
      currentPage: 1,
      name: "历史监测数据",
      page: {},
      loading: {
        indexLoading: false,
        pieLoading: false,
        pieLoading1: false,
        chartLoading: false,
        chartLoading1: false,
        tableLoading: false,
        pieLoading2: false,
        pieLoading3: false
      },
      option: {}
    };
  },
  created() {
    this.header = consts.getHeaderConfig("history");
    this.page = consts.getPageConfig("one");
    // this.contens=Contents.getContent('table')

    // this.one=this.contens.one
    this.getTableData();
    this.getPointsData();
  },
  methods: {
    // 获取表格列表
    getTableData() {
      this.tableData = Contents.pointsTable;
    },
    // 删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    filterTag(value, row) {
      return row.format === value;
    },
    getPointsData() {
      this.option = Points.onePoints;
      // this.option=Points.one
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/css/clear";
@import "../../../static/css/common";
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
}
.survey_content2 {
  width: 99.5%;
  height: 100%;
  .contents {
    background-color: #fff;
    // background-color: rgb(198, 219, 212);
    margin: 15px;
    padding: 15px;
    .grahp {
      // height: 300px;
      background-color: red;
      margin: 20px 0;
      .grahps {
        height: auto;
        background-color: green;
      }
    }
  }
}
</style>
<style>
.el-checkbox__label {
  font-size: 12px;
  line-height: 12px;
}
</style>

