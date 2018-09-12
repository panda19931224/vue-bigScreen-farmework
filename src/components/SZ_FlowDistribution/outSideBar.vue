<template>
  <div :class="className" :style="{height:height,width:width}" id="BARCHARTHJTIOOVF"></div>
</template>

<script>
import echarts from 'echarts'
var maxData = []
var maxNumArray = []
var echartsData = []
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      bgImg: require('../../assets/images/szFlowDistribution/bgImg.png'),
      fillIMg: require('../../assets/images/szFlowDistribution/fillimg.png'),
      scale: 1
    }
  },
  mounted () {
    this.start()
    this.initBarChart()
  },
  beforeRouteUpdate () {
    this.start()
    this.setOption()
  },
  methods: {
    initBarChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption()
    },
    start() {
      echartsData = this.data
      echartsData.forEach(function(value, index) {
        maxNumArray.push(value.value)
      })
      echartsData.forEach(function(value, index) {
        maxData.push({
          name: value.name,
          value: Math.max.apply(null, maxNumArray)
        })
      })
    },
    setOption () {
      this.chart.setOption({
        // backgroundColor: '#031f2d',
        title: {
          text: '省外客源地TOP10城市',
          x: '2%',
          y: '1%',
          textStyle: {
            color: '#4DA2F7',
            fontSize: 18,
            fontWeight: 400
          }
        },
        grid: {
          left: '3%',
          right: '6%',
          bottom: '3%',
          top: '25%',
          containLabel: true
        },
        yAxis: [{
          type: 'value',
          name: '%',
          splitLine: {
            show: false
          },
          axisLine: {
            // show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: true,
            inside: true,
            length: 8 * this.scale
          },
          axisLabel: {
            textStyle: {
              fontSize: 10 * this.scale
            }
          }
        }],
        xAxis: [{
          type: 'category',
          data: this.data.map(item => item.name),
          boundaryGap: ['20%', '20%'],
          splitLine: {
            show: false
          },
          axisLine: {
            // show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            //   rotate: 45,
            padding: [10, 0, 0, 0],
            textStyle: {
              fontSize: 12 * this.scale,
              color: '#fff'
            }
          }
        }],
        series: [{
          name: '100',
          type: 'pictorialBar',
          stack: '总量',
          z: 3,
          barWidth: '45%',
          data: echartsData,
          symbol: 'image://' + this.fillIMg,
          symbolClip: true,
          symbolSize: [16, '100%']
        }, {
          name: '占位',
          type: 'pictorialBar',
          barWidth: '45%',
          barGap: '-100%',
          silent: true,
          label: {
            normal: {
              show: true,
              position: 'top',
              distance: 20 * this.scale,
              formatter: function(params) {
                var stuNum = 0
                echartsData.forEach(function(value, index, array) {
                  if (params.name === value.name) {
                    stuNum = value.per
                  }
                })
                return stuNum
                // return stuNum + '{white| 人}'
              },
              textStyle: {
                color: '#fff',
                fontSize: 12 * this.scale
              },
              rich: {
                white: {
                  color: '#fff',
                  align: 'left',
                  fontSize: 10 * this.scale,
                  padding: [0, 0]
                }
              }
            }
          },
          symbol: 'image://' + this.bgImg,
          symbolClip: true,
          symbolSize: [16, '100%'],
          data: maxData
        }]
      })
    }
  }
}
</script>
