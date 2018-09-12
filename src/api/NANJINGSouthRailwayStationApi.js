import Vue from 'vue'
import Codes from '../codes/apiResultCodes'
import { Notification } from 'element-ui'
import sysId from '../model/NANJINGNANStationRailway'
export default {
  /**
   * 当日分时段客流
   * @param param
   */
  PassengerFlowInDifferentPeriodsOfDay () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/dayDivisionFlow?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 实时客流
   * @param param
   */
  realTimeFlow () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/realTimeFlow?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 昨日客流
   * @param param
   */
  yesterTimeFlow () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/yestodayFlow?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 昨日年龄
   * @param param
   */
  yesterAgeList () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/yestodayAge?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 昨日年龄
   * @param param
   */
  yesterGenderList () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/yestodaySex?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 昨日省内客流
   * @param param
   */
  yestodayInsideProvinceFlow () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/yestodayInsideProvinceFlow?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 昨日省外客流
   * @param param
   */
  yestodayOutsideProvinceFlow () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/yestodayOutsideProvinceFlow?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 过去5天旅客平均停留时长
   * @param param
   */
  stayTime () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/stayTime?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 南站大屏路线畅通情况
   * @param param
   */
  specRoad () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/specRoad?scenicid=${sysId.AREA_ID}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  },
  /**
   * 监测区域
   * @param param
   */
  monitor (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`scene/nanjingSouthStation/monitor?date=${param}`).then(res => {
        if (res.status === Codes.SUCCESS) {
          resolve(res)
        } else {
          Notification.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    })
  }
}
