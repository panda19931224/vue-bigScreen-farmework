import { NANJINGSouthRailwayStationApi } from '../../api/Index'
import Base from '../base/Index'
var AgeRangeConfig = [{ key: 'cnt_00_22', value: '22岁及以下' }, { key: 'cnt_23_35', value: '23~35岁' }, {
  key: 'cnt_36_45',
  value: '36~45岁'
}, {
  key: 'cnt_46_55',
  value: '46~55岁'
}, { key: 'cnt_56_00', value: '56岁及以上' }]

export default class extends Base {
  /**
   *当日分时段客流
   */
  PassengerFlowInDifferentPeriodsOfDay (param) {
    NANJINGSouthRailwayStationApi.PassengerFlowInDifferentPeriodsOfDay(param).then(res => {
      if (res.data) {
        var DifferentPeriodsXaxis = []
        var DifferentPeriodsData = []
        res.data.map(item => {
          DifferentPeriodsXaxis.push(item.hh)
          DifferentPeriodsData.push(item.real_num_all)
          this.vm.differentPeriodsXaxis.push(item.hh)
          this.vm.differentPeriodsData.push(item.real_num_all)
        })
        this.vm.differentPeriodsXaxis = DifferentPeriodsXaxis
        this.vm.differentPeriodsData = DifferentPeriodsData
      }
    })
  }
  /**
   *实时客流
   */
  realTimeFlow (param) {
    NANJINGSouthRailwayStationApi.realTimeFlow(param).then(res => {
      if (res.data) {
        this.vm.realTimeFlow = res.data[0].real_num_all
      }
    })
  }
  /**
   *昨日客流
   */
  yesterTimeFlow (param) {
    NANJINGSouthRailwayStationApi.yesterTimeFlow(param).then(res => {
      if (res.data) {
        this.vm.yesterTimeFlow = res.data[0].day_num
      }
    })
  }
  /**
   *昨日年龄
   */
  yesterAgeList (param) {
    NANJINGSouthRailwayStationApi.yesterAgeList(param).then(res => {
      if (res.data) {
        this.vm.ageList = []
        for (let key in res.data[0]) {
          AgeRangeConfig.map(item => {
            if (item.key === key) {
              this.vm.ageList.push({ name: item.value, value: res.data[0][key] })
            }
          })
        }
      }
    })
  }
  /**
   *昨日性别
   */
  yesterGenderList (param) {
    NANJINGSouthRailwayStationApi.yesterGenderList(param).then(res => {
      if (res.data) {
        this.vm.man = res.data[0].man / (res.data[0].man + res.data[0].woman) * 100
        this.vm.woman = res.data[0].woman / (res.data[0].man + res.data[0].woman) * 100
      }
    })
  }
  /**
   *昨日省内客流
   */
  yestodayInsideProvinceFlow (param) {
    NANJINGSouthRailwayStationApi.yestodayInsideProvinceFlow(param).then(res => {
      if (res.data) {
        this.vm.cityData = res.data.map(item => ([{ name: '南京市' }, { name: item.city_name, value: item.day_num }]))
      }
    })
  }
  /**
   *昨日省外客流
   */
  yestodayOutsideProvinceFlow (param) {
    NANJINGSouthRailwayStationApi.yestodayOutsideProvinceFlow(param).then(res => {
      if (res.data) {
        this.vm.proData = res.data.filter(item => item.city_name !== '').map(item => ([{ name: '江苏' }, { name: item.city_name, value: item.day_num }]))
      }
    })
  }
  /**
   *过去5天旅客平均停留时长
   */
  stayTime (param) {
    NANJINGSouthRailwayStationApi.stayTime(param).then(res => {
      if (res.data) {
        this.vm.barData = []
        var data = []
        var xAxis = []
        res.data.map(item => {
          data.push(item.avg_stay)
          xAxis.push(item.dd.slice(4))
        })
        this.vm.barData.push(xAxis, data)
      }
    })
  }
  /**
   *南站大屏路线畅通情况
   */
  specRoad (param) {
    NANJINGSouthRailwayStationApi.specRoad(param).then(res => {
      if (res.data) {
        this.vm.newList = res.data.map(item => ({from: item.spec1, to: item.spec2, hour: item.avg_min, min: item.sj_num, status: item.road_situation}))
      }
    })
  }
  /**
   *监测区域
   */
  monitor (param) {
    NANJINGSouthRailwayStationApi.monitor(param).then(res => {
      this.vm.location = [{name: '', left: '39%', top: '28%', value: '0'}]
      if (res.data) {
        this.vm.location = res.data.map(item => ({name: item.spec, left: item.spec === '高铁检票口-南' ? '39%' : item.spec === '长途客运站' ? '34%' : item.spec === '出租车停车场' ? '54%' : item.spec === '高铁出站口' ? '41%' : item.spec === '落客平台' ? '34%' : item.spec === '地铁站' ? '60%' : '21%', top: item.spec === '高铁检票口-南' ? '28%' : item.spec === '长途客运站' ? '42%' : item.spec === '出租车停车场' ? '54%' : item.spec === '高铁出站口' ? '49%' : item.spec === '落客平台' ? '35%' : item.spec === '地铁站' ? '79%' : '54%', value: item.nums}))
      }
      console.log(this.vm.location)
    })
  }
}
