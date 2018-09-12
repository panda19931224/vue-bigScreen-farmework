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
        return '分时人流量变化'
      }
    },
    legendData: {
      type: Array,
      default: () => {
        return ['今日', '昨日']
      }
    },
    xAxis: {
      type: Array,
      default: () => {
        return ['08.11', '08.12', '08.13', '08.14', '08.15']
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
        return [100, 200, 150, 250, 300]
      }
    },
    seriesData2: {
      type: Array,
      default: () => {
        return [150, 100, 250, 200, 300]
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
    'seriesData2': {
      handler (val) {
        this.setOption.series[1].data = val
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
          y: '2%',
          textStyle: {
            color: '#4DA2F7',
            fontSize: 16,
            fontWeight: 400
          }
        },
        tooltip: {
          show: false,
          // trigger: 'axis',
          showContent: false,
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: this.legendData,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 200
          },
          x: 'right',
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
              color: '#fff'
            }
          },
          axisLabel: {
            color: '#fff',
            fontWeight: 'bold'
          },
          data: this.xAxis
        },
        yAxis: {
          name: '客流量（千人）',
          type: 'value',
          data: this.yAxis,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#73191f'],
              type: 'double'
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
          name: '今日',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#4DA2F7'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(78, 163, 248, 1)'
              }, {
                offset: 1,
                color: 'rgba(78, 163, 64, 0.1)'
              }])
            }
          },
          data: this.seriesData
        },
        {
          name: '昨日',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#ED8A46'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(226, 108, 91, 1)'
              }, {
                offset: 1,
                color: 'rgba(246, 141, 91, 0.1)'
              }])
            }
          },
          data: this.seriesData2
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
