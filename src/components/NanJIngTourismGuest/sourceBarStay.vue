<template>
  <div class="con" id="stay" ref="leftBottomBox">
    <div class="con_left" ref="conLeft">
      <div class="chart_icon" v-for="(item, i) in enterData.slice(0, 5)" :key="i">
        <div class="c_i_t">
          <div class="c_i_o">
            <span>{{item.cName}}</span>
          </div>
          <p class="chart_bg" style="width:100%">
            <span class="chart_bg_per" :style="{width: item.data + '%'}"></span>
          </p>
        </div>
        <div class="c_i_data">
          <span>{{item.data+ '%'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  props: {
    enterData: {
      type: Array,
      default: function () {
        return ''
      }
    }
  },
  mounted () {
    this.initHeight()
  },
  data () {
    return {
      delayTime: 1000
    }
  },
  methods: {
    initHeight () {
      let _height = this.$refs.leftBottomBox.clientHeight
      console.log(' _height:', _height)
    }
  }
}
</script>
<style lang="scss">
/*.con{*/
/*text-align: center;*/
/*}*/
#stay{
  .con_left {
    width: 100%;
    /*margin-top:1rem;*/
    display: inline-block;
    box-sizing: border-box;
    position:relative;
  }

  .chart_icon {
    width: 100%;
    height: 10%;
    /*padding:0.5rem 0;*/
    margin: 1rem auto;
  }

  .c_i_o {
    /*float:left;*/
    /*width: 15%;*/
    /*margin-top: 0;*/
    /*height: 1.2rem;*/
    /*text-align: center;*/
    line-height: 1.2rem;
    position:absolute;
    width:auto;
    left: 0.5rem;
    top: 0;
    z-index: 1000;
    color:#fff;
  }

  .c_i_t {
    float:left;
    width: 80%;
    background: #2b2c59;
    background-size: 100% 100%;
    height: 1.2rem;
    position: relative;
  }
  .c_i_data{
    float:left;
    width: 20%;
    height: 1.2rem;
    line-height: 1.2rem;
  }
  .chart_bg {
    height: 100%;
    /*border-radius: 50px;*/
    .chart_bg_per{
      display:inline-block;
      float: left;
      height:100%;
      width: 20%;
      background: #5e75a5;
    }
  }
  .chart_icon:nth-child(1) .c_i_t .chart_bg_per{
    background: #bc1c6a;
  }
  .chart_icon:nth-child(2) .c_i_t .chart_bg_per{
    background: #3ad6c4;
  }
  .chart_icon:nth-child(3) .c_i_t .chart_bg_per{
    background: #3d68c4;
  }
  .chart_bg {
    /*background:url("../../assets/images/cursorActive.png");*/
  }

  .chart_icon .c_i_o span, .chart_icon .c_i_data span {
    display:inline-block;
    width:100%;
    height:100%;
    text-align: center;
    float: left;
    color: #fff;
    font-size: 0.8rem;
  }
  .chart_icon .c_i_data span{
    color: #fff;
  }
}
</style>
