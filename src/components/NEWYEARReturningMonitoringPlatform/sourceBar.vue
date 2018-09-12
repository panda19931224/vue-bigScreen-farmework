<template>
  <div class="con" id="springFenbu">
    <div class="con_left">
      <div class="chart_icon" v-for="(item, i) in enterData.slice(0, 10)" :key="i">
        <div class="c_i_o">
          <span>{{item.cName}}</span>
          <span>{{item.cVal}}</span>
        </div>
        <div class="c_i_t">
          <p class="chart_bg" style="width:100%"
             :class="{chart_bg_level11:item.data>99,chart_bg_level10:item.data>90&&item.data<99,chart_bg_level9:item.data>80&&item.data<90,chart_bg_level8:item.data>70&&item.data<80,chart_bg_level7:item.data>60&&item.data<70,chart_bg_level6:item.data>50&&item.data<60,chart_bg_level5:item.data>40&&item.data<50,chart_bg_level4:item.data>30&&item.data<40,chart_bg_level3:item.data>20&&item.data<30,chart_bg_level2:item.data>0&&item.data<20}"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    enterData: {
      type: Array,
      default: function () {
        return ''
      }
    }
  },
  mounted () {
  },
  data () {
    return {}
  },
  methods: {
  }
  // watch: {
  //   enterData () {
  //     this.data.a = 2
  //   }
  // },
  // computed: {
  //   data () {
  //     var a = 1
  //     return this.enterData.map(item => { return console.log(item.data, item.data > 70 && item.data < 90, a) })
  //   }
  // }
}
</script>
<style lang="scss">
  #springFenbu{
    .con_left {
      width: 100%;
      padding-top:2rem;
      display: inline-block;
      box-sizing: border-box;
    }
    .chart_icon {
      width: 70%;
      height: 8%;
      /*padding:0.5rem 0;*/
      float:right;
      margin: 0.1rem 0.2rem 0.1rem 0;
    }

    .c_i_o, .c_i_t {
      width: 100%;
      margin-top: 0;
      height: 0.4rem;
    }

    .c_i_t {
      float:left;
      width: 100%;
      background: url("../../assets/images/NEWYEARReturning/ic_bg.png");
      background-size: 100% 100%;
      height: 0.4rem;
    }

    .chart_bg {
      height: 100%;
    }
    .chart_bg_level1 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_1.png");
      background-size: 100% 100%;
    }

    .chart_bg_level2 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_2.png");
      background-size: 100% 100%;
    }

    .chart_bg_level3 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_3.png");
      background-size: 100% 100%;
    }

    .chart_bg_level4 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_4.png");
      background-size: 100% 100%;
    }

    .chart_bg_level5 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_5.png");
      background-size: 100% 100%;
    }

    .chart_bg_level6 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_6.png");
      background-size: 100% 100%;
    }

    .chart_bg_level7 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_7.png");
      background-size: 100% 100%;
    }

    .chart_bg_level8 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_8.png");
      background-size: 100% 100%;
    }

    .chart_bg_level9 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_9.png");
      background-size: 100% 100%;
    }

    .chart_bg_level10 {
      background: url("../../assets/images/NEWYEARReturning/ic_bg_10.png");
      background-size: 100% 100%;
    }

    .chart_bg {
      /*background:url("../../assets/images/cursorActive.png");*/
    }

    .chart_icon .c_i_o span:first-child {
      float: left;
      color: #fff;
      font-size: 0.5rem;
    }

    .chart_icon .c_i_o span:last-child {
      float: right;
      color: #fff;
      font-size: 0.5rem;
    }
  }
</style>
