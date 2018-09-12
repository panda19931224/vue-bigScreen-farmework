<template>
  <div id="app" style="height:100%;">
    <!--default slot-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {}
  },
  beforeMount () {
    this.initBaseFontSize()
  },
  mounted () {
    let _this = this
    window.onresize = function () {
      _this.initBaseFontSize()
    }
  },
  computed: {},
  methods: {
    /**
     * 根据屏幕宽度计算html基准的font-size
     */
    initBaseFontSize () {
      let _width = document.documentElement.clientWidth * 20 / 1280
      _width = _width > 27 ? 27 : _width
      document.documentElement.style.fontSize = `${_width}px`
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
#nprogress .spinner {
  display: none;
}

@import "styles/icon.css";
@import "./styles/index.scss";
</style>
