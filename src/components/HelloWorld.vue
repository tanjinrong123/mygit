<template>
  <div class="a clearfix" id='allmap'>
    <baidu-map class="hello" :zoom="zoom" @ready="handler"  center="西安" :scroll-wheel-zoom="true">
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
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
      @select="chooseOne"
      @keyup.enter="chooseOne"
    ></el-autocomplete>
    <!-- 搜索下拉框     -->
    <el-collapse v-model="activeName" accordion class="searchResult"  v-show="isSearch">
        <el-collapse-item title="项目简介" name="1">
          <div class="texts">巫山县地处渝东大门，受地层岩性、地质构造、地形地貌、水文地质及人类工程活动等诸多因素的影响，巫山县长江干流库岸区域地质灾害极为发育，
            在江河岸坡、台地边缘形成了众多的滑坡、危岩、泥石流、塌陷等地质灾害...</div>
        </el-collapse-item>
        <el-collapse-item title="项目文档" name="2">
          <div class="words">
            <ul v-for="item in project.words" :key="item.id" class="wordsUl" >
              <li><a href="">{{item.name}}</a></li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="项目表格" name="3">
          <div class="words">
            <ul v-for="item in project.xlx" :key="item.id" class="wordsUl" >
              <li><a href="">{{item.name}}</a></li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="项目图形" name="4">
          <div class="words">
            <ul v-for="item in project.shp" :key="item.id" class="wordsUl" >
              <li><a href="">{{item.name}}</a></li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="项目图片" name="5">
           <div class="imgs">
             <!-- <img src="../assets/images/1.jpg" alt=""> -->
            <ul v-for="item in project.img" :key="item.id" class="imgUl" >
              <li><img :src='item.url'></li>
            </ul>
          </div>
        </el-collapse-item>
    </el-collapse>
    <!-- 导航栏 -->
    <div class="navigator clearfix">
      <el-menu 
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
           <el-submenu :index="ele.index" v-for="ele in item.project"  :key="ele.index">
            <template slot="title">{{ele.name}}</template>
             <el-menu-item-group >
                <el-menu-item @click.native="changeTitle(route_keys.levelIndex)" v-for="route_keys in item.levelInfo" 
                  :index="route_keys.levelIndex" :key="route_keys.levelIndex" :route="route_keys.path">{{route_keys.level}}</el-menu-item>
                </el-menu-item-group>
          </el-submenu>
        </el-submenu>        
      </el-menu>
    </div>

  </div>
</template>
<script>
import * as consts from '../common/const'
  export default {
    name: 'HelloWorld',
    data () {
      return { 
      center: {lng: 0, lat: 0},
      zoom: 6 ,
      restaurants:[],
      state: '',
      timeout:  null,
      activeName:['1'],
      project:[],
      isCollapse: true,
      lng:'109.89',
      lat:'31.07',
      Opacity:0,
      projectPoints:[
        {lng:109.897043,
        lat:31.075075,
        name:'巫山三峡'},
        {lng:110.014452,
        lat:36.583472,
        name:'延长'
        }
      ],
      points:[
        {lng:109.84,
        lat:31.25,
        name:'X1'
        },{lng:110,
        lat:31.0753,
        name:'X2'
        },{lng:109.899,
        lat:31.075075
        },{lng:109.891,
        lat:31.075075
        },{lng:116.307852,
        lat:40.057031}
      ],
      projects:[],
      menu:{},
      isSearch:false,
      }
    },
    created(){
      this.getMenu()
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
        marker.addEventListener('click',(e)=>{
          // console.log(marker,e);
        })
          markers.push(marker)
          map.addOverlay(marker) 
        })
        map.addEventListener("mousemove",(e)=>{
        this.lng=e.point.lng.toFixed(2)+'°'
        this.lat= e.point.lat.toFixed(2)+'°'
        })
        // 当zoom大于10时，显示监测点
        map.addEventListener('zoomend',()=>{          
          this.addJCD(map,markers)          
        })
        map.addEventListener("click",(e)=>{
        this.lng=e.point.lng.toFixed(2)+'°'
        this.lat= e.point.lat.toFixed(2)+'°'
        })
      },
      // 获取导航栏
      getMenu(){
        this.menu=consts.ASIDE_TITLE
        this.projects=this.menu.project
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
        return [{ "value": "巫山三峡", "address": "长宁区新渔路144号" },
          { "value": "延长", "address": "上海市长宁区淞虹路661号" },]
      }, 
      // 搜索框搜索
      chooseOne(val){
        let choice=val.value
        // 调用接口，获取数据project
        this.isSearch=true
        this.project={
          words:[{id:0,name:'长江干流地灾调查总报告-A3',src:'path'},{id:1,name:'巫山长江沿线地层简表',src:'path'},{id:2,name:'危岩特征表-笔架山区域'},{id:3,name:'危岩特征表-笔架山区域'},{id:4,name:'危岩特征表-笔架山区域'},{id:5,name:'危岩特征表-笔架山区域'},{id:6,name:'危岩特征表-笔架山区域'},],
          xlx:[{id:0,name:'长江干流地灾调查总报告-A3',src:'path'},{id:1,name:'巫山长江沿线地层简表',src:'path'},{id:2,name:'危岩特征表-笔架山区域'},{id:3,name:'危岩特征表-笔架山区域'},{id:4,name:'危岩特征表-笔架山区域'},{id:5,name:'危岩特征表-笔架山区域'},{id:6,name:'危岩特征表-笔架山区域'},],
          shp:[{id:0,name:'水系',src:'path'},{id:1,name:'坡度',src:'path'},{id:2,name:'滑坡点'},{id:3,name:'危岩特征表-笔架山区域'},{id:4,name:'危岩特征表-笔架山区域'},{id:5,name:'危岩特征表-笔架山区域'},{id:6,name:'危岩特征表-笔架山区域'},],
          img:[{id:0,name:'长江干流地灾调查总报告-A3',src:'path',url:require('../assets/images/1.jpg')},{id:1,name:'巫山长江沿线地层简表',src:'path',url:require('../assets/images/1.jpg')},{id:2,name:'危岩特征表-笔架山区域',url:require('../assets/images/1.jpg')},{id:3,name:'危岩特征表-笔架山区域',url:require('../assets/images/1.jpg')},{id:4,name:'危岩特征表-笔架山区域',url:'../assets/images/1.jpg'}]
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.a{
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  .hello{
    position: absolute;
    height: 100%;
    width: 100%;
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
    .words{
      text-align: left;
      height: 300px;
      overflow: auto;
      .wordsUl{
        height: 15px;
        padding:0 30px;
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
  .navigator{
    // background: rgba(185, 184, 184, 0.8);
    width: 160px;
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
        margin: 10px 30px;
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
}
  
</style>
<style>
.clearfix:after{visibility:hidden;display:block;font-size:0;content: " ";clear:both;height:0;}
.clearfix{*zoom:1;}
.el-collapse-item__header{
      color: #71a8e0;
      font-size: 14px;
      padding: 0 10px;
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
  padding-left: 30px !important;
  height: 35px;
  line-height: 35px;
  min-width: 150px;
  padding: 0 85px;
  color: #71a8e0;
  font-size: 12px;
}
 .el-submenu__title{
  padding-left: 25px !important;
  text-align: left;
  color: #71a8e0;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.el-menu--inline .el-submenu__title{
   padding-left: 30px !important;
   font-size: 14px;
}
.el-menu{
  height: 100%;
}
.el-submenu__title i{
  color: #fff;
}
</style>

