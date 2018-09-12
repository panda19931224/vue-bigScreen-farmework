import Vue from 'vue'
// import Codes from '../codes/apiResultCodes'
// import { Notification } from 'element-ui'
import sysId from '../model/NEWYEARReturningMonitoringPlatform'
export default {
  /**
   * 春节返乡接口
   * @param param
   */
  NewYEarReturningAll () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`http://61.160.148.22:8088/cache/chineseNewYear/getALLdata?areaId=${sysId.AREA_ID}`).then(res => {
        resolve(res)
        // if (res.status === Codes.SUCCESS) {
        //   resolve(res)
        // } else {
        //   Notification.error({
        //     title: '错误',
        //     message: res.msg
        //   })
        // }
      })
    })
  }
}
