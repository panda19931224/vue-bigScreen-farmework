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
    data: {
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
    'data': {
      handler (val, oldVal) {
        this.option.series.data = val
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
            radius: [0, '70%'],
            label: {
              normal: {
                // position: 'inner',
                formatter: '{b} :\n{d}%',
                color: '#fff'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.data
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
