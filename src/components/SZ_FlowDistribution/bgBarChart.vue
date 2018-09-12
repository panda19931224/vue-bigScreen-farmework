<template>
  <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
var xData = []
var yData = []
var data = []

export default {
  components: {},
  props: {
    chartId: {
      type: String,
      default: () => {
        return 'line-chart'
      }
    },
    className: {
      type: String,
      default: () => {
        return ''
      }
    },
    width: {
      type: String,
      default: () => {
        return '100%'
      }
    },
    height: {
      type: String,
      default: () => {
        return '100%'
      }
    },
    title: {
      type: String,
      default: () => {
        return '省内客源地TOP10城市'
      }
    },
    legendData: {
      type: Array,
      default: () => {
        return []
      }
    },
    xAxis: {
      type: Array,
      default: () => {
        return []
      }
    },
    yAxis: {
      type: Array,
      default: () => {
        return []
      }
    },
    seriesData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      min: 50,
      xData: [],
      yData: []
    }
  },
  created () {
  },
  mounted () {
    this.start()
    this.initChart()
  },
  watch: {
  },
  computed: {
    setOption () {
      let option = {
        title: {
          text: this.title,
          x: '2%',
          y: '1%',
          textStyle: {
            color: '#4DA2F7',
            fontSize: 16,
            fontWeight: 400
          }
        },
        // backgroundColor: '#111c4e',
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0
            }
          },
          formatter: function(prams) {
            if (prams[0].data === this.min) {
              return '合格率：0%'
            } else {
              return '合格率：' + prams[0].data + '%'
            }
          }
        },
        legend: {
          data: ['直接访问', '背景'],
          show: false
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '6%',
          top: '25%',
          // height: '85%',
          containLabel: true,
          z: 22
        },
        xAxis: [{
          type: 'category',
          gridIndex: 0,
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 12
          }
        }],
        yAxis: [{
          type: 'value',
          name: '(%)',
          top: '2%',
          gridIndex: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: this.min,
          max: 100,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            color: '#fff',
            formatter: '{value}'
          }
        }, {
          type: 'value',
          gridIndex: 0,
          min: this.min,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }],
        series: [{
          name: '合格率',
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00feff'
                },
                {
                  offset: 0.5,
                  color: '#027eff'
                },
                {
                  offset: 1,
                  color: '#0286ff'
                }
                ]
              )
            }
          },
          data: yData,
          zlevel: 11
        }, {
          name: '背景',
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: '-100%',
          data: [100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          zlevel: 9
        }]
      }
      return option
    }
  },
  methods: {
    // 初始化表格
    initChart () {
      this.charts = echarts.init(document.getElementById(this.chartId))
      this.charts.setOption(this.setOption)
    },
    start() {
      data = this.seriesData
      data.map(function(a, b) {
        xData.push(a.name)
        if (a.value === 0) {
          yData.push(a.value + this.min)
        } else {
          yData.push(a.value)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .line-chart {
    background-color: #fff;
  }
</style>
