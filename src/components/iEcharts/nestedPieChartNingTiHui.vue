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
        return null
      }
    }
  },
  data () {
    return {
      giftImageUrl: require('../../assets/images/ningtihui/people.png')
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
        // graphic: {
        //   elements: [{
        //     type: 'image',
        //     style: {
        //       image: this.giftImageUrl,
        //       width: 200,
        //       height: 200
        //     },
        //     left: '135vw',
        //     top: '68vh'
        //   }]
        // },
        legend: {
          orient: 'vertical',
          left: '5%',
          top: 'top',
          data: ['器械健身', '游泳', '羽毛球', '乒乓球', '足球', '台球', '篮球', '射箭', '瑜伽', '网球'],
          // height: 160,
          itemGap: 3
        },
        series: [
          {
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['55%', '55%'],
            label: {
              normal: {
                formatter: '{b}\n{d|{d}%}\n',
                rich: {
                  b: {
                    fontSize: 20,
                    color: '#333',
                    align: 'left',
                    padding: 4
                  },
                  d: {
                    fontSize: 10,
                    align: 'left',
                    padding: 4
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                lineStyle: {
                }
              }
            },
            data: [
              { value: 689, name: '器械健身', itemStyle: { normal: { color: '#EF7124' } } },
              { value: 505, name: '游泳', itemStyle: { normal: { color: '#FABF01' } } },
              { value: 393, name: '羽毛球', itemStyle: { normal: { color: '#99C532' } } },
              { value: 128, name: '乒乓球', itemStyle: { normal: { color: '#029F52' } } },
              { value: 91, name: '足球', itemStyle: { normal: { color: '#038A7C' } } },
              { value: 65, name: '台球', itemStyle: { normal: { color: '#039DB7' } } },
              { value: 28, name: '篮球', itemStyle: { normal: { color: '#0267B7' } } },
              { value: 13, name: '射箭', itemStyle: { normal: { color: '#132480' } } },
              { value: 15, name: '瑜伽', itemStyle: { normal: { color: '#843AC5' } } },
              { value: 5, name: '网球', itemStyle: { normal: { color: '#700AC5' } } }
            ],
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
