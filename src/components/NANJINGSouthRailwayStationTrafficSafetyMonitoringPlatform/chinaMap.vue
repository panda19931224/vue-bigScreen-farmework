<template>
  <div style="position:relative;">
    <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
    <div class="tooltip">
      <p v-for="(item, index) in cityData.slice(0, 5)" :key="index">top{{index + 1}}: {{item[1].name}}</p>
      <!--<p>top1: 江苏省</p>-->
      <!--<p>top2: 安徽省</p>-->
      <!--<p>top3: 浙江省</p>-->
      <!--<p>top4: 河南省</p>-->
      <!--<p>top5: 四川省</p>-->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../static/echartsJs/china'

require('echarts/theme/macarons') // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    title: {
      type: String,
      default: () => {
        return '昨日旅客省外来源迁徙图'
      }
    },
    chartId: {
      type: String,
      default: 'jiangsu'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    touristName: {
      type: String,
      default: ''
    },
    geoCoordMap: {
      type: Object,
      default: () => {
        return {
          '天津': [117.0407, 39.224801],
          '河南': [113.628002, 34.827497],
          '湖北': [114.28628, 30.624948],
          '江苏': [118.843635, 32.063295],
          '青海': [101.722761, 36.66297],
          '北京': [116.63596, 40.282725],
          '河北': [114.479869, 38.087912],
          '四川': [104.048988, 30.655815],
          '重庆': [106.554241, 29.715252],
          '黑龙江': [126.556057, 45.826005],
          '海南': [109.939344, 19.403303],
          '浙江': [120.186302, 30.288401],
          '吉林': [125.351343, 43.821221],
          '西藏': [91.036665, 29.694964],
          '辽宁': [123.415908, 41.831725],
          '广西': [108.35073, 22.870846],
          '甘肃': [103.823881, 36.086137],
          '安徽': [115.888705, 32.906094],
          '内蒙古': [111.666526, 40.865579],
          '宁夏': [106.206476, 38.522264],
          '上海': [121.492846, 31.308155],
          '广东': [113.252652, 23.154025],
          '江西': [115.836576, 28.712577],
          '湖南': [113.11284, 28.2688],
          '山西': [112.533106, 37.929111],
          '山东': [117.107196, 36.683937],
          '贵州': [106.61445, 26.650066],
          '陕西': [108.938716, 34.362574],
          '福建': [119.310412, 26.082005],
          '云南': [100.805417, 21.999986],
          '新疆': [87.670369, 43.826113]
        }
      }
    },
    cityData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      planePath: 'arrow',
      color: ['#a1cba3', '#ffa022', '#46bee9'],
      option: {
        title: {
          text: this.title,
          x: '2%',
          y: '5%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 400
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          calculable: true,
          color: ['#fff9b8', '#63e2e4', '#a1cba3', '#82f4f8'],
          textStyle: {
            color: '#fff'
          }
        },
        // tooltip: {
        //   trigger: 'item'
        // },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#4970b6',
              borderColor: '#378cc8'
            },
            emphasis: {
              areaColor: '#1495cb'
            }
          }
        },
        series: []
      },
      lineData: []
    }
  },
  watch: {
    'cityData': {
      handler (val, oldVal) {
        this.seriesData(val)
        this.drawBar(this.chartId)
      }
    }
  },
  mounted () {
    this.seriesData(this.cityData)
    this.drawBar(this.chartId)
  },
  methods: {
    seriesData (cityData) {
      [['西溪', cityData]].forEach((item, i) => {
        this.lineData.push({
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: this.color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: this.convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: this.planePath,
            symbolSize: 5
          },
          lineStyle: {
            normal: {
              color: this.color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: this.convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize (val) {
            // return val[2] / 8
            return 10
          },
          itemStyle: {
            normal: {
              color: this.color[i]
            }
          },
          data: item[1].map((dataItem) => {
            return {
              name: dataItem[1].name,
              value: this.geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            }
          })
        })
        this.option.series = this.lineData
      })
    },
    convertData (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var toCoord = this.geoCoordMap[dataItem[0].name]
        var fromCoord = this.geoCoordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push([{
            coord: fromCoord
          }, {
            coord: toCoord
          }])
        }
      }
      return res
    },
    drawBar (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption(this.option)
    }
  }
}
</script>
<style lang="scss">
  .tooltip{
    width:100%;
    height:3rem;
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    p{
      color:#fff;
      font-size: 0.4rem;
      margin-top: 0.2rem;
    }
  }
</style>
