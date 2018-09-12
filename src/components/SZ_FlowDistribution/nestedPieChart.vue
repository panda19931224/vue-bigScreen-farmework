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
    dataGroup2: {
      type: Array,
      default: () => {
        return [
          {value: 335, name: '本市占比'},
          {value: 310, name: '省外占比'},
          {value: 234, name: '国外占比'},
          {value: 135, name: '省内外市占比'}
        ]
      }
    }
  },
  data () {
    return {
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
            name: '实时人流量人数',
            type: 'pie',
            color: ['#fbce11', '#f88530', '#6437fb', '#3aa1fd'],
            radius: ['20%', '40%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}:} {per|{d}%}  ',
                backgroundColor: 'transparent',
                borderColor: '#4EA3F8',
                borderWidth: 1,
                borderRadius: 4,
                width: 115,
                rich: {
                  a: {
                    width: 115,
                    color: '#fff',
                    lineHeight: 22,
                    fontSize: 10,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#4EA3F8',
                    width: 115,
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    // width: 55,
                    color: '#eee',
                    fontSize: 8,
                    lineHeight: 33,
                    // padding: [0, 1]
                    // margin: [0, 0]
                  },
                  per: {
                    // width: 35,
                    color: '#eee',
                    // backgroundColor: '#334455',
                    padding: [2, 0],
                    borderRadius: 2
                  }
                }
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
