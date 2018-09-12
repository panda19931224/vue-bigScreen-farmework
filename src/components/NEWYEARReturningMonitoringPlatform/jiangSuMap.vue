<template>
  <div style="position:relative;">
    <div :class="className" :style="{height:height,width:width}" :id="chartId" style="position:relative;top:-2rem;left:-1rem;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../static/echartsJs/jiangsu'

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
        return ''
      }
    },
    chartId: {
      type: String,
      default: 'jiangsu'
    },
    width: {
      type: String,
      default: '140%'
    },
    height: {
      type: String,
      default: '140%'
    },
    touristName: {
      type: String,
      default: ''
    },
    geoCoordMap: {
      type: Object,
      default: () => {
        return {
          '南京市': [118.843635, 32.063295],
          '苏州市': [120.64657, 31.355533],
          '无锡市': [120.315419, 31.509344],
          '镇江市': [119.42775, 32.184635],
          '常州市': [119.975069, 31.827981],
          '南通市': [120.848941, 32.118114],
          '扬州市': [119.418551, 32.458029],
          '泰州市': [119.919877, 32.485323],
          '盐城市': [120.117648, 33.392876],
          '淮安市': [118.954019, 33.708673],
          '宿迁市': [118.319312, 33.977333],
          '徐州市': [117.252269, 34.279509],
          '连云港市': [119.183985, 34.633834],
          '西溪': [120.295516, 32.842927]
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
        // tooltip: {
        //   trigger: 'item'
        // },
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
          color: ['#f1c06b'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: '江苏',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#5c061c',
              borderColor: '#991611'
            },
            emphasis: {
              areaColor: '#d32709'
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
      [['南京', cityData]].forEach((item, i) => {
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
            // return val[5] / 90
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
      window.onresize = this.charts.resize
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
