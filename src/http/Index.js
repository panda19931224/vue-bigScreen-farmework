/**
 * Created by chang on 2017/8/1.
 */
import xHttp from './XHttp'

export default function (Vue) {
  if (!Vue.$api) {
    Vue.$api = {
      xHttp
    }
  } else {
    Vue.$api.xHttp = xHttp
  }
  Vue.mixin({
    created () {
      this.$api = {
        xHttp
      }
    }
  })
}
