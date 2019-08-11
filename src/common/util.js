// Create by zyc on 2018/06/25

import moment from 'moment'

// 页面滚动
const scroll = (val) => {
  return val ? {
    le: store.state.continer_left
  } : {
    le: store.state.continer_left
  }
}

// 默认
const defalutTime = () => {
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24)
  return [start]
}

// 设置不可选择的日期
let a = []
const pickerdisabled = {
  disabledDate: (time) => {
    if (a.length <= 1) {
      a.push(moment(time).format('YYYY-MM-DD'))
    }
    // let old = moment(time).subtract(366, 'days').format('YYYY-MM-DD')
    // let n = moment(time).format('YYYY-MM-DD')
    // return time.getTime() >= Date.now() || time.getTime() <= new Date(old).getTime()
    a = []
    return time.getTime() >= Date.now()
  }
}

// 设置不可选择的月份
const monthdisabled = {
  disabledDate: (time) => {
    return time.getTime() >= Date.now() || time.getTime() < new Date('2014-12-31').getTime()
  }
}
// 设置不可选择的年份
const yeardisabled = {
  disabledDate: (time) => {
    return time.getFullYear() < new Date().getFullYear()
  }
}
// const conditionTime = (value) => {
//   const end = moment().format('YYYY-MM-DD')
//   const start = new Date()
//   start.setTime(start.getTime() - 3600 * 1000 * 24*value)
//   return [start, end]
// }

// 对比前x天
class ReportTime {
  constructor () {
    // now
    let thisday = moment().format('YYYY-MM-DD')

    // 昨日
    this.yesterday = moment(thisday).subtract(1, 'days').format('YYYY-MM-DD')

    // 上周
    let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天

    this.preweekday = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD') // 周日日期
    this.premonday = moment().subtract(weekOfday + 6, 'days').format('YYYY-MM-DD') // 周一日期

    // 本周
    let day = new Date().getDay()
    this.thismonday = moment(thisday).add((7 - day), 'days').format('YYYY-MM-DD') // 本周日
    if (day === 0) {
      this.thisweekday = moment(thisday).subtract(6, 'days').format('YYYY-MM-DD') // 本周一
    } else {
      this.thisweekday = moment(thisday).subtract((day - 1), 'days').format('YYYY-MM-DD') // 本周一
    }
    this.thisWeekNow = moment().subtract(1, 'days').format('YYYY-MM-DD')

    // 本月
    this.thismonthstart = moment().startOf('month').format('YYYY-MM-DD') // 本月开始
    this.thismonthend = moment().endOf('month').format('YYYY-MM-DD') // 本月结束

    // 上月
    this.premonthend = moment(this.thismonthstart).subtract(1, 'days').format('YYYY-MM-DD') // 上月结束
    this.premonthstart = moment(this.premonthend).startOf('month').format('YYYY-MM-DD') // 上月开始
    this.premonth = moment(this.premonthend).startOf('month').format('YYYY-MM')
  }
  // 时间差 计算两个日期的间隔的天数
  timeinterval (val) {
    return (new Date(val[1]).getTime() - new Date(val[0]).getTime()) / (24 * 3600 * 1000)
  }
  // 时间差 计算两个日期的间隔的天数
  monthInterval (val) {
    let date1 = new Date(val[0])
    let date2 = new Date(val[1])

    let y1 = date1.getFullYear()
    let y2 = date2.getFullYear()

    let m1 = date1.getMonth() + 1
    let m2 = date2.getMonth() + 1

    if (y1 === y2) {
      return m2 - m1
    } else {
      if (m2 > m1) {
        return (12 - (m2 - m1)) + (y2 - y1 - 1) * 12
      }
      return (12 - (m1 - m2)) + (y2 - y1 - 1) * 12
    }
  }
  // 对比同步时间
  sameTime (time) {
    // 默认对比时间
    let timeblock = this.timeinterval(time)
    let endkday = moment(time[0]).subtract(1, 'days').format('YYYY-MM-DD')
    let startday = moment(endkday).subtract(timeblock, 'days').format('YYYY-MM-DD')

    return [startday, endkday]
  }
  sameMonthTime (time) {
    let timeblock = this.monthInterval(time)
    let endkday = moment(moment(time[0]).subtract(1, 'months').format('YYYY-MM-DD')).endOf('month').format('YYYY-MM-DD')
    let startday = moment(moment(endkday).subtract(timeblock, 'months').format('YYYY-MM-DD')).startOf('month').format('YYYY-MM-DD')
    return [startday, endkday]
  }
  // 将对比时间的 时间段和被对比的时间段同步（天数）
  sameStart (start, end) {
    // 根据开始时间
    let timeblock = this.timeinterval(start)
    let endFormat = end.map(item => moment(item).format('YYYY-MM-DD'))
    let afterTime = moment(endFormat[0]).add(timeblock, 'days').format('YYYY-MM-DD')
    return [endFormat[0], afterTime]
  }
  // 将对比时间的 时间段和被对比的时间段同步（月份）
  sameStartMonth (start, end) {
    // 根据开始时间
    let timeblock = this.monthInterval(start)
    let endFormat = end.map(item => moment(item).format('YYYY-MM-DD'))
    let afterTime = moment(moment(endFormat[0]).add(timeblock, 'months')).endOf('month').format('YYYY-MM-DD')
    return [endFormat[0], afterTime]
  }
  recently (nDay) {
    return moment().subtract(nDay, 'days').format('YYYY-MM-DD')
  }
  // 时间与tab按钮（上周、本周、上月、本月同步）
  // 时间段 获取时间名
  timeTab (start) {
    let tabName = ''
    let startString = start.join('')
    const self = this
    let thisWeek = ''
    if (moment().format('d') === 1) {
      thisWeek = self.thisweekday + self.thisweekday
    } else {
      thisWeek = self.thisweekday + self.thisWeekNow
    }
    switch (startString) {
      case self.premonday + self.preweekday:
        tabName = '上周'
        break
      case thisWeek:
        tabName = '本周'
        break
      case self.premonthstart + self.premonthend:
        tabName = '上月'
        break
      case self.thismonthstart + self.yesterday:
      // self.monthend:
        tabName = '本月'
        break
      case self.recently(7) + self.yesterday:
        tabName = '最近7天'
        break
      case self.recently(28) + self.yesterday:
        tabName = '最近28天'
        break
      case self.processMon(start[1], 2):
        tabName = '最近3个月'
        break
      case self.processMon(start[1], 5):
        // console.log('6: ' + self.processMon(start[1], 5))
        tabName = '最近6个月'
        break
      case self.processMon(start[1], 8):
        // console.log('9: ' + self.processMon(start[1], 8))
        tabName = '最近9个月'
        break
      default:
        tabName = ''
        break
    }
    return tabName
  }
  processMon (time, n) {
    let startTime = moment(time).subtract(n, 'month').format('YYYY-MM') + '-01'
    return startTime + time
  }
  // 根据tab时间名 获取时间段
  getime (name) {
    let tabTime = ''
    switch (name) {
      case '昨日':
        tabTime = [this.yesterday]
        break
      case '本周':
        if (moment().format('d') === 1) {
          tabTime = [this.thisweekday, this.thisweekday]
        } else {
          tabTime = [this.thisweekday, this.thisWeekNow]
        }
        // tabTime = [this.thisweekday, this.thismonday]
        break
      case '上周':
        tabTime = [this.premonday, this.preweekday]
        break
      case '上月':
        tabTime = [this.premonthstart, this.premonthend]
        break
      case '本月':
        // tabTime = [this.thismonthstart, this.thismonthend]
        tabTime = [this.thismonthstart, this.yesterday]
        break
      case '最近7天':
        tabTime = [this.recently(7), this.yesterday]
        break
      case '最近28天':
        tabTime = [this.recently(28), this.yesterday]
        break
      default:
        tabTime = [this.premonday, this.preweekday] // 默认上周
        break
    }
    return tabTime
  }
  setMonth (count) {
    return moment().subtract(count, 'months').format('YYYY-MM')
  }
  getMonth (name) {
    let tabTime = ''
    switch (name) {
      case '上月':
        tabTime = [this.setMonth(1)]
        break
      case '最近3个月':
        tabTime = [this.setMonth(2), this.setMonth(0)]
        break
      case '最近6个月':
        tabTime = [this.setMonth(5), this.setMonth(0)]
        break
      case '最近9个月':
        tabTime = [this.setMonth(8), this.setMonth(0)]
        break
      case '最近12个月':
        tabTime = [this.setMonth(11), this.setMonth(0)]
        break
    }
    return tabTime
  }
  getMos (timeArr) {
    let beforeMonth = ''
    switch (moment(timeArr[0]).format('YYYY-MM')) {
      case moment(timeArr[1]).subtract(2, 'months').format('YYYY-MM'):
        beforeMonth = '最近3个月'
        break
      case moment(timeArr[1]).subtract(5, 'months').format('YYYY-MM'):
        beforeMonth = '最近6个月'
        break
      case moment(timeArr[1]).subtract(8, 'months').format('YYYY-MM'):
        beforeMonth = '最近9个月'
        break
      case moment(timeArr[1]).subtract(11, 'months').format('YYYY-MM'):
        beforeMonth = '最近12个月'
        break
    }
    return beforeMonth
  }
  monthTab (month) {
    let tabTime = ''
    switch (month) {
      case this.premonth:
        tabTime = '上月'
        break
      default:
        tabTime = ''
        break
    }
    return tabTime
  }

  queryTime (time) {
    // 明天
    let tomorrow
    if (time.length === 1) {
      tomorrow = moment(time[0]).format('YYYY-MM-DD')
    } else {
      tomorrow = moment(time[1]).format('YYYY-MM-DD')
    }
    return {
      startTime: time[0],
      endTime: tomorrow
    }
  }

  queryCompareTime (time) {
    // 明天
    let tomorrow
    if (time.length === 1) {
      tomorrow = moment(time[0]).format('YYYY-MM-DD')
    } else {
      tomorrow = moment(time[1]).format('YYYY-MM-DD')
    }
    return {
      compareStartTime: moment(time[0]).format('YYYY-MM-DD'),
      compareEndTime: tomorrow
    }
  }

  // 某个月的开始和结束时间
  queryMonth (val) {
    let sM = moment(val).startOf('month').format('YYYY-MM-DD')
    let eM = moment(sM).endOf('month').format('YYYY-MM-DD')
    if (moment().startOf('month').format('YYYY-MM') === moment(val).startOf('month').format('YYYY-MM')) {
      if (moment().format('DD') === '01') {
        return {
          startTime: sM,
          endTime: sM
        }
      }
      return {
        startTime: sM,
        endTime: moment().subtract(1, 'days').format('YYYY-MM-DD')
      }
    }
    return {
      startTime: sM,
      endTime: eM
    }
  }

  // 多个月的
  queryMoreMonth (timeArr, type) {
    type = type || 'object'
    let endTime
    if (timeArr.length === 1) {
      endTime = this.queryMonth(timeArr[0]).endTime
    } else {
      endTime = this.queryMonth(timeArr[1]).endTime
    }
    return type === 'object' ? {
      startTime: this.queryMonth(timeArr[0]).startTime,
      endTime: endTime
    } : [this.queryMonth(timeArr[0]).startTime, endTime]
  }
}

let report = new ReportTime()
const byWatch = (time, tabPosition) => {
  let disabled = [true, true]
  let block = report.timeinterval([time.startTime, time.endTime])
  if (block >= 0 && block < 32) {
    disabled.splice(0, 1, false)
    tabPosition = 'byWeek'
  } else if (block >= 32) {
    // 按月
    disabled.splice(0, 1, false)
    disabled.splice(1, 2, false)
    if (tabPosition === 'byDay') {
      tabPosition = 'byWeek'
    }
  } else {
    tabPosition = 'byWeek'
  }
  return {
    tabPosition: tabPosition,
    disabled: disabled
  }
}

const monthRangeHTML = () => {
  let dt1 = document.createElement('div')
  let dt2 = document.createElement('div')

  dt1.style.fontSize = dt2.style.fontSize = '12px'

  let t1 = document.querySelector('.laydate-main-list-0 .laydate-set-ym [lay-type="year"]')
  let t2 = document.querySelector('.laydate-main-list-1 .laydate-set-ym [lay-type="year"]')

  t1.appendChild(dt1)
  t2.appendChild(dt2)
  if (t1.querySelector('div').innerHTML) {} else {
    dt1.innerHTML = '（开始时间）'
  }
  if (t2.querySelector('div').innerHTML) {} else {
    dt2.innerHTML = '（结束时间）'
  }
}

export {
  pickerdisabled,
  monthdisabled,
  yeardisabled,
  defalutTime,
  scroll,
  report,
  byWatch,
  monthRangeHTML
}
