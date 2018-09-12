<template>
  <div :class="className" ref="pieChartBox" :style="{height:height,width:width}" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'

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
        return '昨日旅客性别、年龄分布'
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
    dataGroup1: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataGroup2: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      giftImageUrl: require('../../assets/images/move/move_logo.png')
    }
  },
  watch: {
    'dataGroup1': {
      handler (val, oldVal) {
        this.option.series[0].data = val
        this.drawBar(this.chartId)
      }
    },
    'dataGroup2': {
      handler (val, oldVal) {
        this.option.series[1].data = val
        this.drawBar(this.chartId)
      }
    }
  },
  mounted () {
    this.drawBar(this.chartId)
  },
  computed: {
    option () {
      let option = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            color: ['#841216', '#ce6e72'],
            selectedMode: 'single',
            radius: [0, '40%'],

            label: {
              normal: {
                position: 'inner',
                formatter: '{b} :\n{d}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.dataGroup1
          },
          {
            name: '访问来源',
            type: 'pie',
            color: ['#530a1e', '#651128', '#801b37', '#9e3e42', '#b65a5e'],
            radius: ['50%', '70%'],
            label: {
              normal: {
                formatter: '{b} :\n{d}%',
                color: '#fff'
              }
            },
            data: this.dataGroup2
          }
        ]
      }
      return option
    }
  },
  methods: {
    drawBar (id) {
      this.charts = echarts.init(document.getElementById(id))
      window.onresize = this.charts.resize
      this.charts.setOption(this.option)
    }
  }
}
</script>
