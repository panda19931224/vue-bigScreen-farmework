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
        return '人流流入流出变化'
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
            type: 'cross',
            label: {
              color: '#000'
            }
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
          name: '客流量（人）',
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
        series: [{
          name: '今日',
          type: 'line',
          lineStyle: {
            normal: {
              color: '#4DA2F7'
            }
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#89C4F4',
              borderColor: '#89f4F4',
              shadowColor: '#89C4F4',
              shadowBlur: 10
            }
          },
          color: ['#89C4F4'],
          markPoint: {
            symbol: 'roundRect',
            symbolSize: [90, 20],
            symbolOffset: [0, '100%'],
            label: {
              normal: {
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold',
                formatter: '流入：{c}人'
              }
            },
            data: [
              {type: 'max', name: '最大值'}
            ]
          },
          data: this.seriesData
        },
        {
          name: '昨日',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          color: ['#ED8A46'],
          lineStyle: {
            normal: {
              color: '#ED8A46'
            }
          },
          itemStyle: {
            normal: {
              color: '#ED8A46',
              borderColor: '#ff9f99',
              shadowColor: '#ff9f99',
              shadowBlur: 10
            }
          },
          markPoint: {
            symbol: 'roundRect',
            symbolSize: [90, 20],
            symbolOffset: [0, '100%'],
            label: {
              normal: {
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold',
                formatter: '流出：{c}人'
              }
            },
            data: [
              {type: 'min', name: '最小值'}
            ]
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
