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
        return 'lineChart'
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
        return '过去五天旅客平均驻留时长'
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
    barData: {
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
  computed: {
    setOption () {
      let option = {
        color: ['#019be5'],
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        title: {
          text: this.title,
          x: '2%',
          y: '2%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 400
          }
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '6%',
          top: '18%',
          // height: '85%',
          containLabel: true,
          z: 22
        },
        xAxis: [
          {
            type: 'category',
            data: this.barData[0],
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            name: '分钟',
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              inside: true
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#c5634a'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#318be0'}
                  ]
                )
              }
            },
            data: this.barData[1]
          }
        ]
      }
      return option
    }
  },
  watch: {
    barData (val) {
      if (val) {
        this.initChart()
      }
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
