<template>
<div class="title">
  <div class="nav_title clearfix" >
       <p class='survey'>{{name}}</p>
       <div class='content'>
          <div class="float_left" v-if="headerShow[0]">
            <span>时间：</span>
            <el-date-picker 
              size="mini"             
              v-model="time"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              @change="changeTime">
            </el-date-picker>
          </div>
          <div class="float_left" v-if="headerShow[1]">
            <span>项目：</span>
            <el-select
              size="mini"
              v-model="queryData.projectId"
              @change="changeProject">
              <el-option
                v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="float_left" v-if="headerShow[2]">
            <span>类型：</span>
            <el-select
              size="mini"
              v-model="queryData.tableType"
              @change="changeTableType">
              <el-option
                v-for="item in TableTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="float_left" v-if="headerShow[3]">
            <span>监测点：</span>
              <el-cascader
                size="mini"
                class="select-md-w"
                expand-trigger="hover"
                v-model="initPoint"
                :options="pointList"
                @change="changePoint">
              </el-cascader>
          </div>
          <div class="float_left" v-if="headerShow[4]">
            <span>类型：</span>
            <el-select
              size="mini"
              v-model="queryData.graphType"
              @change="changeTableType">
              <el-option
                v-for="item in GraphTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="float_right flex-nowrap right_switch"  v-if="contrastStatus">      
            <span>对比：</span>
            <span class="padding-right-md">
              <el-switch
                v-model="switchStatus"
                active-color="#3C76FF"
                inactive-color="#EDEDED"
                @change="onContrast">
              </el-switch>
            </span>
            <transition name="slide-fade">
              <div v-if="switchStatus" class="flex-nowrap">
                <el-select v-model="checkId" placeholder="请选择" @change="updateCheck" size="mini">
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span v-show="checked[0]" class="padding-left-10">
                  <label>
                    <div v-if="!showPick" class="a_pick font-theme">与其它时间段对比</div>
                      <el-date-picker
                        size="mini"
                        class="clearable"
                        v-model="timeVal"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        format="yyyy-MM-dd"
                        @change = "changeEnd">
                      </el-date-picker>
                  </label>
                </span>
                <span class="padding-left-10" v-if="checked[1]">
                  <div class="el-select">
                    <el-select
                      size="mini"
                      class="font-theme"
                      placeholder="选择对比类型"
                      v-model="queryData.compareTableType"
                      @change="changeTable_other">
                      <el-option
                        v-for="item in TableTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </span>
                <!-- <span v-if="checked[2]" class="padding-left-10">
                  <div class="el-select">
                    <el-select
                      class="font-theme"
                      placeholder="选择对比顾客"
                      v-model="queryData.compareIsOld"
                      @change="changeCustomer_other">
                      <el-option
                        v-for="item in customerList"
                        :key="item.isOld"
                        :label="item.label"
                        :value="item.isOld">
                      </el-option>
                    </el-select>
                  </div>
                </span>
                <span class="padding-left-10" v-if="checked[3]">
                  <div class="el-select">
                    <el-select
                      class="font-theme"
                      placeholder="选择对比会员"
                      v-model="queryData.compareCustType"
                      @change="changeMember_other">
                      <el-option
                        v-for="item in memberList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </span>
                <span class="padding-left-10" v-if="checked[4]">
                  <div class="el-select">
                    <el-cascader
                      popper-class="select_drop_theme"
                      class="select_theme font-theme"                      
                      :props="{ expandTrigger: 'hover' }"
                      :options="passFlow"
                      placeholder="选择对比客流渠道"
                      @change="changeChannel_other">
                    </el-cascader>
                  </div>
                </span>
                <span class="padding-left-10" v-if="checked[5]">
                  <div class="el-select">
                    <el-select
                      class="font-theme"
                      placeholder="选择对比预约渠道"
                      v-model="queryData.comBookSource"
                      @change="changeAppoint_other">
                      <el-option
                        v-for="item in appointChannel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </span>
                <div v-if="checked[6]" class="padding-left-10">
                  <el-cascader
                    placeholder="选择对比项目"
                    popper-class="select_drop_theme"
                    class="select-theme"
                    :props="{ expandTrigger: 'hover' }"
                    v-model="compareProject"
                    :options="projectList"
                    @change="changeProject_other">
                  </el-cascader>
                </div>
                <span class="padding-left-10" v-if="checked[7]">
                  <div class="el-select">
                    <el-select
                      class="font-theme"
                      placeholder="选择对比储值卡类型"
                      v-model="queryData.compareCardType"
                      @change="changeCard_other">
                      <el-option
                        v-for="item in cardList"
                        :key="item.cardType"
                        :label="item.label"
                        :value="item.cardType">
                      </el-option>
                    </el-select>
                  </div>
                </span> -->
              </div>
            </transition>
          </div>  
          </div>
       </div>
  </div>
  
</template>

<script>
import * as consts from '../../common/const'
import * as util from '../../common/util'

export default {
  props:{
    header:[Object],
    name:[String]
  },
  data(){
    return{
       query: {
        time: [],
        time_contrast: []
      },
      time:'',
      queryData:{
        projectId:1,
        tableType:3,
        graphType:0,
        compareTableType:null
      },
      projectList:[],
      pointList:[],
      initPoint:[3,30],
      TableTypeList:[],
      headerShow:[],
      GraphTypeList:[],
      switchStatus:false,
      contrastStatus:false,
      checkId: 1,
      options: [{
          value: 1,
          label: '时间'
        }, {
          value: 2,
          label: '类型'
        }, {
          value: 3,
          label: '监测点'
        }
      ],
      checked: [true, false, false, false,false],
      showPick: false,
      timeVal:''
    }
  },
  computed: {
    pickerOptions () {
      return util.pickerdisabled
    }
  },
  created(){
    this.getProject()
    this.headerShow=this.header.headerShow
    this.contrastStatus=this.header.contrast
    this.changeStart()
  },
  methods:{
    getProject(){
      this.projectList=consts.Project
      this.pointList=consts.Points  
      this.TableTypeList=consts.TableType
      this.GraphTypeList=consts.GraphType
    },
    changeProject(v){
      console.log(v);
    },
    // 改变表格类型
    changeTableType(){},
    // 改变对比表格类型
    changeTable_other(){},
    changePoint(){},
    onContrast(val){
      this.showPick = !val
    },
    updateCheck(index){
      this.checkId = index
      this.checked = this.checked.map(() => false)
      this.checked.splice(index-1, 1, true)
      this.showPick = false
      
    },
    changeEnd(){
      this.showPick = true
    },
    changeStart(){
      let a=new Date()
      
    },
    changeTime(v){
      console.log(v,8);

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
.title{
  height: 80px;
  width: 100%;
}
.nav_title{
  position: fixed;
  top:0;
  right: 0;
  left: 142px; 
  z-index: 99;
  background-color: #fff;
  .survey{
    text-align: left;
    padding:10px 10px 18px;
    font-weight:900;
    font-size: 14px;
  }
  .content{
    height:  30px;
    font-size: 12px; 
    .el-select{
      width: 120px;
    } 
    .float_left{
      float: left;
      padding-left: 15px;
      padding-bottom: 6px;           
      .el-cascader{
        width: 166px;
      }
    }
    .float_right{
      float: right;
      right: 20px;
    }
    .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
        width: 174px;
      } 
    .el-date-editor .el-range__icon{
        display: none;
      }
    .padding-right-md {
      padding-right: 20px;
    }
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
    
  }  
}


</style>
<style>

.el-date-range-picker__time-header{
  display: none;
}
.el-picker-panel .el-date-range-picker .el-popper has-time{
  top: 65px;
}
.el-date-range-picker{
  width: 414px;
}
.el-input--small{
  font-size: 10px;
}
.el-date-range-picker__content{
  width: 50%;
  padding: 7px;
}
.el-date-range-picker__header{
  height: 20px;
}
.el-date-range-picker__header div{
  font-size: 12px;
}
.el-picker-panel__icon-btn{
  margin-top: 0px;
}
.el-date-table{
  font-size: 10px;
}
.el-date-table td, .el-date-table td div{
  height: 20px;
}
.el-date-table td{
  padding: 2px 0;
}
.el-date-table td div{
  padding: 0px;
}
.el-date-table td span{
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.el-picker-panel__footer{
  padding: 2px;
}
.el-date-range-picker .el-picker-panel__body{
  min-width: 0px;
}
.el-time-panel{
  width: 100px;
}
.el-time-spinner__item{
  font-size: 10px;
}
.el-select-dropdown__item{
    font-size: 12px;
  }
.el-select-dropdown{
  min-width: 120px !important;
}
.el-cascader-panel{
  font-size: 12px;
}
.el-cascader-menu{
  min-width: 130px;
}
.el-cascader-node{
  height: 25px;
  line-height: 25px;
}
.el-cascader{
  width: 130px;
}
</style>

