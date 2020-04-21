<template>
  <div class="a" id='allmap'>
    <sider></sider>
    <baidu-map :class="menuShow?'hello flex9':'hello flex10'" :zoom="zoom" @ready="handler"  center="西安" :scroll-wheel-zoom="true">
      <!-- <bm-view class="hello"></bm-view> -->
      <!-- <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation> -->
      <bm-map-type :map-types="['BMAP_NORMAL_MAP','BMAP_SATELLITE_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" type=""></bm-map-type>
      <div v-for="item in projectPoints" :key='item.name'>
        <bm-marker :position="{lng: item.lng, lat: item.lat}" @click="goSearch(item.name)">
          <bm-label :content="item.name" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -15, height: 30}"/>
        </bm-marker> 
      </div>
      <bm-boundary name="重庆市巫山县" :strokeWeight="2" strokeColor="blue" :fillOpacity="Opacity"></bm-boundary>
      <bm-boundary name="延长县" :strokeWeight="2" strokeColor="blue" :fillOpacity="Opacity"></bm-boundary>
    </baidu-map>
    <!-- 经纬度 -->
    <div class="jwd">
      经度：{{lng}} ， 纬度：{{lat}}
    </div>
    <!-- 搜索栏 -->
    <el-autocomplete
      class="search"
      v-model="searchName"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
      @select="chooseOne"
      @keyup.enter="chooseOne"
    ></el-autocomplete>
    <!-- 搜索下拉框     -->
    <el-collapse v-model="activeName" accordion class="searchResult"  v-show="isSearch">
        <el-collapse-item title="滑坡区简介" name="1">
          <div class="texts">巫山县地处渝东大门，受地层岩性、地质构造、地形地貌、水文地质及人类工程活动等诸多因素的影响，巫山县长江干流库岸区域地质灾害极为发育，
            在江河岸坡、台地边缘形成了众多的滑坡、危岩、泥石流、塌陷等地质灾害...</div>          
          <!-- <router-link :to="{ name: 'project_survey',params:{projectName:state}}">查看更多</router-link> -->
          <a class="more" href='#' @click='toSurvey()'>查看更多</a>
        </el-collapse-item>
        <el-collapse-item title="文档" name="2">
          <div class="words">
            <ul v-for="item in project.words" :key="item.id" class="wordsUl" >
              <li><a href="">{{item.name}}</a></li>
            </ul>
          </div>
          <a class="more" href='#' @click='toWord()'>查看更多</a>
        </el-collapse-item>
        <!-- <el-collapse-item title="项目表格" name="3">
          <div class="words">
            <ul v-for="item in project.xlx" :key="item.id" class="wordsUl" >
              <li><a href="">{{item.name}}</a></li>
            </ul>
          </div>
          <a class="more" href='#' @click='toTable()'>查看更多</a>
        </el-collapse-item> -->
        <el-collapse-item title="影像" name="4">
           <div class="imgs">
             <!-- <img src="../assets/images/1.jpg" alt=""> -->
            <ul v-for="item in project.img" :key="item.id" class="imgUl" >
              <li><img :src='item.url'></li>
            </ul>
          </div>
          <a class="more" href='#' @click='toImg()'>查看更多</a>
        </el-collapse-item>
        <el-collapse-item title="矢量数据" name="5">
          <div class="words">
            <ul v-for="item in project.shp" :key="item.id" class="wordsUl" >
              <li><a href="">{{item.name}}</a></li>
            </ul>
          </div>
          <a class="more" href='#' @click='toShp()'>查看更多</a>
        </el-collapse-item>
        
    </el-collapse>    
  </div>
</template>
<script>
// console.log('89');
//   d3 = require("d3-geo@1")
//   shapefile = require("shapefile")
//   projection = d3.geoAlbersUsa()
//     .scale(1272)
//     .translate([width / 2, height / 2])
//     width = 954
//     height=600
//   const context = DOM.context2d(width, height);
//   console.log('89');
//   const context.canvas;
//   const path = d3.geoPath(projection, context);
//   const source = await shapefile.open(await FileAttachment("./static/shp/1.shp").stream(), null);
//   while (true) {
//     const result = await source.read();
//     if (result.done) break;
//     context.beginPath(), path(result.value), context.stroke();
//   }
import * as consts from '../../common/const'
  export default {
    name: 'HelloWorld',
    data () {
      return { 
      center: {lng: 0, lat: 0},
      zoom: 6 ,
      restaurants:[],
      searchName: '',
      timeout:  null,
      activeName:['1'],
      project:[],
      isCollapse: true,
      lng:'109.89',
      lat:'31.07',
      Opacity:0.1,
      projectPoints:[
        {lng:109.89,
        lat:31.19,
        name:'巫山三峡'},
        {lng:110.014452,
        lat:36.583472,
        name:'延长'
        }
      ],
      points:[
        {lng:109.74661305,
        lat:31.031727,
        name:'JC17'
        },{lng:109.7460447,
        lat:31.03273888,
        name:'jc18'
        },{lng:109.7457983,
        lat:31.0331522,
         name:'JC18'
        },{lng:109.7475527,
        lat:31.03259833,
         name:'JC21'
        },{lng:109.74544666,
        lat:31.0361194,
         name:'JC23'},
        {lng:109.747205277,
        lat:31.0339397,
        name:'JC25'},
        {lng:109.746848888,
        lat:31.03514944,
        name:'JC28'},
        {lng:109.7449283,
        lat:31.034776111,
        name:'JC37'},
        {lng:109.74716972,
        lat:31.034162777,
        name:'JC40'},
        {lng:109.74714472,
        lat:31.0347694,
         name:'JC42'},
         {lng:109.74551388,
        lat:31.03370861,
         name:'JC44'},
        //  {lng:109.74544666,
        // lat:31.0361194,
        //  name:'JC23'}
      ],
      projects:[],
      menuShow:false,
      isSearch:false,
      projectId:1
      }
     
    },
    created(){
      // this.getMenu()
    },
    mounted(){
      this.restaurants = this.loadAll()
    },
    watch:{
    },    
    methods:{ 
      handler ({BMap, map}) {
        // console.log(BMap,map);
        this.BMap=BMap
        this.map=map
        // 创建监测点
        var markers=[]
        this.points.forEach(item=>{
        var point = new BMap.Point(item.lng, item.lat);
        var marker = new BMap.Marker(point)
        var label = new BMap.Label(item.name,{labelStyle:{color: 'red', fontSize : '12px'},offset:{width: 0, height: 30}});
        marker.setLabel(label)
        marker.addEventListener('click',(e)=>{
          console.log(marker,e);
          this.$router.push({name:'project_analysis'})
        })
          markers.push(marker)
          map.addOverlay(marker) 
        })
       
        // 当zoom大于10时，显示监测点
        map.addEventListener('zoomend',()=>{          
          this.addJCD(map,markers)          
        })


        // map.addEventListener("click",(e)=>{
        // this.lng=e.point.lng.toFixed(2)+'°'
        // this.lat= e.point.lat.toFixed(2)+'°'
        // })
        // 鼠标移动时，动态显示经纬度
         map.addEventListener("mousemove",(e)=>{
        this.lng=e.point.lng.toFixed(2)+'°'
        this.lat= e.point.lat.toFixed(2)+'°'
        })
      },            
      // 点击大的项目标志，打开快速搜索
      goSearch(name){
        this.isSearch=true
        // 获取该地点的项目资料 
      },
      // 添加监测点
      addJCD(map,markers){
          let z=map.getZoom()
          if(z>=10){
             markers.forEach(marker=>{
              marker.show()
            })
          }else{
            markers.forEach(marker=>{
              marker.hide()
            })
         }        
      },
      // 搜索框
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random())
      },
      createStateFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      loadAll(){
        return [{ "index":1,"value": "巫山三峡", "address": "长宁区新渔路144号" },
          {  "index":2,"value": "延长", "address": "上海市长宁区淞虹路661号" },]
      }, 
      // 搜索框搜索
      chooseOne(val){
        // console.log(val,99);
        this.projectId=val.index
        let choice=val.value
        // 调用接口，获取数据project
        this.isSearch=true
        this.project={
          words:[{id:0,name:'长江干流地灾调查总报告-A3',src:'path'},{id:1,name:'巫山长江沿线地层简表',src:'path'},{id:2,name:'危岩特征表-笔架山区域'},{id:3,name:'危岩特征表-笔架山区域'},{id:4,name:'危岩特征表-笔架山区域'},{id:5,name:'危岩特征表-笔架山区域'},{id:6,name:'危岩特征表-笔架山区域'},],
          xlx:[{id:0,name:'长江干流地灾调查总报告-A3',src:'path'},{id:1,name:'巫山长江沿线地层简表',src:'path'},{id:2,name:'危岩特征表-笔架山区域'},{id:3,name:'危岩特征表-笔架山区域'},{id:4,name:'危岩特征表-笔架山区域'},{id:5,name:'危岩特征表-笔架山区域'},{id:6,name:'危岩特征表-笔架山区域'},],
          shp:[{id:0,name:'水系',src:'path'},{id:1,name:'坡度',src:'path'},{id:2,name:'滑坡点'},{id:3,name:'危岩特征表-笔架山区域'},{id:4,name:'危岩特征表-笔架山区域'},{id:5,name:'危岩特征表-笔架山区域'},{id:6,name:'危岩特征表-笔架山区域'},],
          // img:[{id:0,name:'长江干流地灾调查总报告-A3',src:'path',url:require('../assets/images/1.jpg')},{id:1,name:'巫山长江沿线地层简表',src:'path',url:require('../assets/images/1.jpg')},{id:2,name:'危岩特征表-笔架山区域',url:require('../assets/images/1.jpg')},{id:3,name:'危岩特征表-笔架山区域',url:require('../assets/images/1.jpg')},{id:4,name:'危岩特征表-笔架山区域',url:'../assets/images/1.jpg'}]
        }
      },
      // 点击搜索框的简介，跳转
      toSurvey(){
        this.$router.push({name: 'project_survey',params:{projectId:this.projectId}})
        this.$store.commit('SET_SHOWMENU',true)
      },
      // 点击搜索框的简介，跳转
      toWord(){
        this.$router.push({name: 'project_word',params:{projectId:this.projectId}})
        this.$store.commit('SET_SHOWMENU',true)
      },
      toTable(){
        this.$router.push({name: 'project_table',params:{projectId:this.projectId}})
        this.$store.commit('SET_SHOWMENU',true)
      },
      toShp(){
        this.$router.push({name: 'project_graph',params:{projectId:this.projectId}})
        this.$store.commit('SET_SHOWMENU',true)
      },
      toShp(){
        this.$router.push({name: 'project_img',params:{projectId:this.projectId}})
        this.$store.commit('SET_SHOWMENU',true)
      },
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../../static/css/clear';
@import '../../../static/css/common';
.a{
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  .hello{
    // position: absolute;
    height: 100%;
     // width: 90%;
    right: 0;
    // flex: 0.9;
    // float: right;
    // width: 100%;
  }
  .search{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 350px;   
  }
  .searchResult{
    position: absolute;
    top: 60px;
    right: 10px;
    width: 350px;
    .texts{
      overflow: hidden;
      height: 300px;
      text-overflow: ellipsis;
      text-indent:25px;
      text-align: left;
      padding: 0 10px;
    }
    .more{
      color: #71a8e0;
      float: right;
      margin-right: 10px;
    }
    .words{
      text-align: left;
      height: 300px;
      overflow: auto;
      .wordsUl{
        height: 15px;
        padding:0 30px;
        a{
          color: #606266;
        }
      }
    }
    .imgs{
       float: left;
       list-style: none;
       height: 200px;
      .imgUl{
        list-style: none; 
        float: left;   
        padding: 0 8px; 

        img{
          width: 100px;
          height: 50px;
        }     
      }
    }
    
    
  }
  .jwd{
    position: absolute;
    right: 150px;
    bottom: 10px;
  }
  
}
  
</style>
<style>

.el-collapse-item__header{
      color: #71a8e0;
      font-size: 14px;
      padding: 0 10px;
}

</style>

