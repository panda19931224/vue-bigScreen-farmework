<template>
  <div class="con" id="spring" ref="leftBottomBox">
    <div class="con_left" ref="conLeft">
      <div class="chart_icon" v-for="(item, i) in enterData.slice(0, 10)" :key="i">
        <div class="c_i_o">
          <span>{{item.cName}}</span>
        </div>
        <div class="c_i_t">
          <p class="chart_bg" style="width:100%">
            <span class="chart_bg_per" :style="{width: item.data + '%'}"></span>
          </p>
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
#spring{
  height:auto;
  position:absolute;
  bottom:1rem;
  right:-2rem;
  .con_left {
    width: 75%;
    /*margin-top:1rem;*/
    display: inline-block;
    box-sizing: border-box;
    position:relative;
  }

  .chart_icon {
    width: 90%;
    height: 5%;
    /*padding:0.5rem 0;*/
    margin: 0.2rem auto;
  }

  .c_i_o {
    float:left;
    width: 30%;
    margin-top: 0;
    height: 0.5rem;
    text-align: center;
  }

  .c_i_t {
    float:left;
    width: 70%;
    background: #360616;
    background-size: 100% 100%;
    height: 0.5rem;
  }

  .chart_bg {
    height: 100%;
    .chart_bg_per{
      display:inline-block;
      float: left;
      height:100%;
      width: 20%;
      background: -webkit-linear-gradient(left, #8a1819, #c25d3d);
    }
  }
  .chart_bg {
    /*background:url("../../assets/images/cursorActive.png");*/
  }

  .chart_icon .c_i_o span {
    display:inline-block;
    width:100%;
    height:100%;
    text-align: center;
    float: left;
    color: #fff;
    font-size: 0.4rem;
  }
}
</style>
