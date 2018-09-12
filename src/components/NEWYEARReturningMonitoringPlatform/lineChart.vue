<template>
  <div :class="className" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

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
        return ''
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
    return {}
  },
  created () {
  },
  mounted () {
    this.initChart()
  },
  watch: {
    'seriesData': {
      handler (val) {
        this.setOption.series[0].data = val
        this.initChart()
      },
      deep: true
    },
    'xAxis': {
      handler (val) {
        this.setOption.xAxis.data = val
        this.initChart()
      }
    }
  },
  computed: {
    setOption () {
      let option = {
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
        tooltip: {
          // trigger: 'axis',
          showContent: false,
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: this.legendData,
          x: 'center',
          y: '9%'
        },
        // grid: {
        //   left: '1%',
        //   right: '10%',
        //   bottom: '15%',
        //   top: '35%',
        //   containLabel: true
        // },
        toolbox: {
          show: false
        },
        xAxis: {
          name: '时间',
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#f50400'
            }
          },
          axisLabel: {
            color: '#fff',
            fontWeight: 'bold'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#73191f'],
              type: 'double'
            }
          },
          data: this.xAxis
        },
        yAxis: {
          name: '人',
          type: 'value',
          data: this.yAxis,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#73191f'],
              type: 'double'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#f50400'
            }
          },
          axisLabel: {
            color: '#fff',
            fontWeight: 'bold'
          }
        },
        // series: {
        //   type: 'line',
        //   lineStyle: {
        //     normal: {
        //       color: '#315b99'
        //     }
        //   },
        //   data: this.seriesData
        // }
        series: [{
          type: 'line',
          lineStyle: {
            normal: {
              color: '#f6d895'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#551a1e'
              }, {
                offset: 1,
                color: '#551a1e'
              }])
            }
          },
          data: this.seriesData
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
    }
  }
}
</script>

<style lang="scss">
  .line-chart {
    background-color: #fff;
  }
</style>
