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
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {d}%',
          show: false
        },
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
        // graphic: {
        //   elements: [{
        //     type: 'image',
        //     style: {
        //       image: this.giftImageUrl,
        //       width: 100,
        //       height: 100
        //     },
        //     left: '47%',
        //     top: '32%'
        //   }]
        // },
        // legend: {
        //   orient: 'vertical',
        //   left: '5%',
        //   top: 'top',
        //   data: ['器械健身', '游泳', '羽毛球', '乒乓球', '足球', '台球', '篮球', '射箭', '瑜伽'],
        //   height: 150,
        //   itemGap: 3
        // },
        series: [
          {
            type: 'pie',
            radius: ['20%', '50%'],
            center: ['50%', '65%'],
            color: ['#3200f0', '#3d4d74', '#3acbe3', '#3799e3', '#3751e0'],
            label: {
              normal: {
                color: '#fff',
                formatter: '{b}\n{d|{d}%}\n',
                rich: {
                  b: {
                    fontSize: 20,
                    color: '#fff',
                    align: 'left',
                    padding: 4
                  },
                  d: {
                    fontSize: 10,
                    color: '#fff',
                    align: 'left',
                    padding: 4
                  }
                }
              }
            },
            // labelLine: {
            //   normal: {
            //     show: true,
            //     length: 5,
            //     lineStyle: {
            //       color: '#2B9B39'
            //     }
            //   }
            // },
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
