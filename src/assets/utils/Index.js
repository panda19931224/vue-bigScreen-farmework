import Common from './Common.js'
import Date from './Date.js'
import LocalStorage from './LocalStorage.js'
import Validate from './Validate.js'
import UserAgent from './Useragent'
import Excel from './Excel'
import UUId from './Uuid'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Date,
      LocalStorage,
      Validate,
      UserAgent,
      Excel,
      UUId
    }
  } else {
    Vue.$utils = {
      Common,
      Date,
      LocalStorage,
      Validate,
      UserAgent,
      Excel,
      UUId
    }
  }
  Vue.mixin({
    created () {
      this.$utils = {
        Common,
        Date,
        LocalStorage,
        Validate,
        UserAgent,
        Excel,
        UUId
      }
    }
  })
}
