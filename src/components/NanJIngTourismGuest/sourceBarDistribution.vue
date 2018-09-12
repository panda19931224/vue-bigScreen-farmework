<template>
  <div class="con" id="outside" ref="leftBottomBox">
    <div class="con_left" ref="conLeft">
      <div class="chart_icon" v-for="(item, i) in enterData.slice(0, 5)" :key="i">
        <div class="c_i_o">
          <span>{{item.cName}}</span>
        </div>
        <div class="c_i_t">
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
#outside{
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
    float:left;
    width: 15%;
    margin-top: 0;
    height: 1.2rem;
    text-align: center;
    line-height: 1.2rem;
  }

  .c_i_t {
    float:left;
    width: 65%;
    background: #2b2c59;
    background-size: 100% 100%;
    border-radius: 50px;
    height: 1.2rem;
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
      border-radius: 50px;
      float: left;
      height:100%;
      width: 20%;
      background: #3cd7c9;
    }
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
    color: #69bfff;
    font-size: 0.8rem;
  }
  .chart_icon .c_i_data span{
    color: #fff;
  }
}
</style>
