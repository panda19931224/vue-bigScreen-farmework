<template>
  <div id="shenzhenTourismGuest">
    <div class="title">
      <h3>深圳市人流聚集地实时安全监测平台</h3>
      <div class="select">
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </div>
      <div class="time">
        <span>{{date}}</span>
        <span>{{time}}</span>
        <span>晴</span>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="main-top-left">
          <div class="heat-map-box">
            <div class="heat-map" id="szAllmap">
            </div>
          </div>
        </div>
        <div class="main-top-right">
          <div class="main-top-right-half main-top-right-top">
            <div class="main-top-right-top-left">
              <div class="passenger-flow">
                <div class="count-bg">
                  <h3><count-to :startVal="0" :endVal="parseInt(realTimeFlow)" :duration="delayTime"></count-to></h3>
                </div>
                <p>实时人流量人数 <button style="background:#F7CD46;border: 0;color:#fff; border-radius:5px;padding: 2px;" @click="dialogFormVisible = true">饱和</button></p>
              </div>
              <p class="sz-line"></p>
              <div class="passenger-flow">
                <div class="count-bg">
                  <h3><count-to :startVal="0" :endVal="parseInt(realTimeFlow)" :duration="delayTime"></count-to></h3>
                </div>
                <p>实时人流量人数</p>
              </div>
            </div>
            <div class="main-top-right-top-right">
              <nested-pie-chart></nested-pie-chart>
            </div>
          </div>
          <div class="main-top-right-half main-top-right-bottom">
            <line-chart chart-id="'line'"></line-chart>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="main-bottom-left">
          <div class="main-bottom-left-half">
            <bg-bar-chart :chart-id="'bgBar'" :seriesData="seriesData"></bg-bar-chart>
          </div>
          <div class="main-bottom-left-half2">
            <out-side-bar :chart-id="'gradient'" :data="outSide"></out-side-bar>
          </div>
        </div>
        <div class="main-bottom-right">
          <line-chart-change chart-id="'lineChange'"></line-chart-change>
        </div>
      </div>
      <el-dialog title="预警阀值调整" :visible.sync="dialogFormVisible" center width="30%">
        <el-form :model="form">
          <el-form-item label="瞬间最大承载量：" :label-width="formLabelWidth" style="width:12rem;">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="热力图最大值：" :label-width="formLabelWidth" style="width:12rem;">
            <el-input v-model="form.mapVal" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
// import sysId from '../../model/NEWYEARReturningMonitoringPlatform'
// import NANJINGNANStationRailwayBll from './HUAIANWanDaMonitoringPlatformBll'
// import sourceBarDistribution from '../../components/NanJIngTourismGuest/sourceBarDistribution'
// import sourceBarYester from '../../components/NanJIngTourismGuest/sourceBarYester'
// import sourceBarStay from '../../components/NanJIngTourismGuest/sourceBarStay'
import nestedPieChart from '../../components/SZ_FlowDistribution/nestedPieChart'
import lineChart from '../../components/SZ_FlowDistribution/lineChart'
import lineChartChange from '../../components/SZ_FlowDistribution/lineChartChange'
import outSideBar from '../../components/SZ_FlowDistribution/outSideBar'
import bgBarChart from '../../components/SZ_FlowDistribution/bgBarChart'
import BMap from 'BMap'
import BMapLib from 'BMapLib'
export default {
  components: {
    CountTo, nestedPieChart, lineChart, lineChartChange, outSideBar, bgBarChart
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        mapVal: ''
      },
      formLabelWidth: '130px',
      seriesData: [
        {
          'name': '一月',
          'value': 80
        }, {
          'name': '二月',
          'value': 87.8
        }, {
          'name': '三月',
          'value': 71
        }, {
          'name': '四月',
          'value': 80
        }, {
          'name': '五月',
          'value': 66
        }, {
          'name': '六月',
          'value': 80
        }, {
          'name': '九月',
          'value': 80
        }
      ],
      outSide: [
        {
          name: '梧州',
          value: 10000,
          per: '8.12'
        }, {
          name: '玉林',
          value: 9700,
          per: '7.01'
        }, {
          name: '南林',
          value: 9400,
          per: '6.71'
        }, {
          name: '三亚',
          value: 9100,
          per: '6.60'
        }, {
          name: '长沙',
          value: 8800,
          per: '6.02'
        }, {
          name: '重庆',
          value: 8500,
          per: '5.41'
        }, {
          name: '上海',
          value: 8200,
          per: '5.35'
        }, {
          name: '柳州',
          value: 7900,
          per: '5.26'
        }, {
          name: '衡阳',
          value: 7600,
          per: '4.66'
        }, {
          name: '北京',
          value: 7300,
          per: '3.52'
        }
      ],
      realTimeFlow: 888888,
      date: '2018/07/01',
      time: '11:10',
      value: '',
      delayTime: 1000,
      index: 0,
      isShow: 'scenic1',
      enterData: [
        {
          cName: '南京',
          cVal: 1270700,
          data: 95.59
        },
        {
          cName: '泰州',
          cVal: 1089300,
          data: 90.59
        },
        {
          cName: '无锡',
          cVal: 963500,
          data: 87.59
        },
        {
          cName: '南通',
          cVal: 893400,
          data: 76.59
        },
        {
          cName: '徐州',
          cVal: 240600,
          data: 55.59
        },
        {
          cName: '苏州',
          cVal: 198500,
          data: 45.59
        },
        {
          cName: '扬州',
          cVal: 90700,
          data: 35.59
        },
        {
          cName: '常州',
          cVal: 84500,
          data: 22.59
        },
        {
          cName: '连云港',
          cVal: 75900,
          data: 19.59
        },
        {
          cName: '镇江',
          cVal: 67300,
          data: 16.59
        },
        {
          cName: '盐城',
          cVal: 55700,
          data: 11.59
        },
        {
          cName: '宿迁',
          cVal: 53700,
          data: 6.59
        },
        {
          cName: '淮安',
          cVal: 28600,
          data: 3.59
        }
      ],
      points: [
        {'lng': 116.418261, 'lat': 39.921984, 'count': 50},
        {'lng': 116.423332, 'lat': 39.916532, 'count': 51},
        {'lng': 116.419787, 'lat': 39.930658, 'count': 15},
        {'lng': 116.418455, 'lat': 39.920921, 'count': 40},
        {'lng': 116.418843, 'lat': 39.915516, 'count': 100},
        {'lng': 116.42546, 'lat': 39.918503, 'count': 6},
        {'lng': 116.423289, 'lat': 39.919989, 'count': 18},
        {'lng': 116.418162, 'lat': 39.915051, 'count': 80}
      ],
      options: [{
        value: 'culture',
        label: '文化类',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'sport',
          label: '体育类',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'tourists',
        label: '旅游类',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'auther',
        label: '其他',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions: []
    }
  },
  created () {
    // var date = this.$utils.Date.format(new Date(new Date()), 'yyyyMMdd')
    // this.BLL = new NANJINGNANStationRailwayBll(this)
  },
  beforeMount () {},
  watch: {
  },
  mounted () {
    setInterval(this.updateTime, 1000)
    this.heatMap()
  },
  computed: {
  },
  methods: {
    heatMap() {
      var map = new BMap.Map('szAllmap')
      var point = new BMap.Point(114.03695, 22.616561)
      map.centerAndZoom(point, 17)
      map.enableScrollWheelZoom()
      // var topLeftControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT})
      var topLeftNavigation = new BMap.NavigationControl()
      // map.addControl(topLeftControl)
      map.addControl(topLeftNavigation)
      var heatmapOverlay = new BMapLib.HeatmapOverlay({'radius': 20})
      map.addOverlay(heatmapOverlay)
      heatmapOverlay.setDataSet({data: this.points, max: 800})
      var polygon = new BMap.Polygon([
        new BMap.Point(114.038028, 22.619855),
        new BMap.Point(114.04092, 22.615668),
        new BMap.Point(114.034165, 22.611915),
        new BMap.Point(114.03262, 22.614284),
        new BMap.Point(114.033626, 22.615101),
        new BMap.Point(114.032638, 22.616903)
      ], {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5, fillColor: '#eee', fillColorOpacity: 0.1})
      map.addOverlay(polygon)
      var pt = new BMap.Point(114.03695, 22.616561)
      var myIcon = new BMap.Icon(require('../../assets/images/szFlowDistribution/landmark.png'), new BMap.Size(100, 107))
      var marker2 = new BMap.Marker(pt, {icon: myIcon})
      map.addOverlay(marker2)
    },
    updateTime () {
      var cd = new Date()
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ':' +
        this.zeroPadding(cd.getMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getSeconds(), 2)
      // this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()]
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        '/' +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        '/' +
        this.zeroPadding(cd.getDate(), 2)
    },
    zeroPadding (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/mixin';
@import './Index';
</style>
