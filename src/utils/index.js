import dateFns from 'date-fns'
const { eachDay, addDays, addMinutes, addHours, addSeconds, format } = dateFns

// 获取随机数
export function getRandom(len, start = 0) {
  return Math.floor(Math.random() * len) + start
}

export function getRandomTime() {
  const rand = getRandom(180, 30) * -1
  return format(addSeconds(new Date(), rand), 'HH:mm:ss')
}

// 获取随机数+两位小数
export function getRandomWithFloat(len, start = 0) {
  return getRandom(len, start) + Number(Math.random().toFixed(2))
}

export function sumWithFloat(m, n) {
  return Number((m + n).toFixed(2))
}

export function getRandomFromArr(list, start = 0, end = list.length) {
  return [...list].sort(() => 0.5 - Math.random()).slice(0, getRandom(start, end))
}

export function numHandler(value, isPadEnd, separator = ', ') {
  if (!value) return '0'
  let [int, float] = String(value).split('.')
  float = isPadEnd && !float ? '00' : float
  let intPartFormat = int.replace(/(\d)(?=(?:\d{3})+$)/g, `$1${separator}`) // 将整数部分逢三一断
  return float ? `${intPartFormat}.${float}` : intPartFormat
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

// 两位小数
export function toFixed2(val) {
  return Math.round(val * 100) / 100
}

// 到当前时间的hours
export function getPrevHoursOfDay(min = 8) {
  const curHour = new Date().getHours() + 1
  const minHour = min + 1
  const len = curHour < minHour ? minHour : curHour
  return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '00')}:00`).slice(0, len)
}

// 十分钟
export function getPrev10Min() {
  const curr = new Date()
  let startTime = format(addMinutes(curr, -20), 'YYYY-MM-DDTHH:mm:00+0800')
  let endTime = format(addMinutes(curr, -10), 'YYYY-MM-DDTHH:mm:00+0800')
  startTime = startTime.replace(/([\w\W]+)(\d{1})(:00\+0800)$/, (_, $1, $2, $3) => {
    return `${$1}0${$3}`
  })
  endTime = endTime.replace(/([\w\W]+)(\d{1})(:00\+0800)$/, (_, $1, $2, $3) => {
    return `${$1}0${$3}`
  })
  return { startTime, endTime }
}

// 前7小时（往前推一小时）
export function getPrev7HourNode(date = new Date()) {
  const curr = date
  let startTime = format(addHours(curr, -8), 'YYYY-MM-DDTHH:00:00+0800')
  let endTime = format(addHours(curr, -1), 'YYYY-MM-DDTHH:00:00+0800')
  return { startTime, endTime }
}

// 到前七小时
export function getPrev7Hour(date = new Date()) {
  let arr = []
  const curr = date
  for (let i = 7; i > 0; i -= 1) {
    arr.push(format(addHours(curr, i * -1), 'HH:00'))
  }
  return arr
}

// 组装7小时相关，保证节点时间和时间轴相同
export function getPrev7HourInfo(date = new Date()) {
  return {
    node: getPrev7HourNode(date),
    list: getPrev7Hour(date)
  }
}

// 当天往前推一周
export function getPrev1Week(date = new Date()) {
  return eachDay(addDays(date, -7), addDays(date, -1)).map(e => format(e, 'MM/DD'))
}

// 一周
export function getPrev1WeekNode(date = new Date()) {
  return {
    startTime: format(addDays(date, -7), 'YYYY-MM-DDT00:00:00+0800'),
    endTime: format(addDays(date, -1), 'YYYY-MM-DDT23:59:59+0800')
  }
}

// 组装一周相关，保证节点时间和时间轴相同
export function getPrev1WeekInfo(date = new Date()) {
  return {
    node: getPrev1WeekNode(date),
    list: getPrev1Week(date)
  }
}

export function getPrev1WeekExt(date = new Date()) {
  return `${format(addDays(date, -7), 'YYYY-MM-DD')} - ${format(addDays(date, -1), 'YYYY-MM-DD')}`
}

// 当天
export function getCurDay() {
  return {
    startDate: format(new Date(), 'YYYY-MM-DDT00:00:00+0800'),
    endDate: format(new Date(), 'YYYY-MM-DDT23:59:59+0800')
  }
}

// 昨天
export function getLastDay() {
  return {
    startDate: format(addDays(new Date(), -1), 'YYYY-MM-DDT00:00:00+0800'),
    endDate: format(addDays(new Date(), -1), 'YYYY-MM-DDT23:59:59+0800')
  }
}

export function getTenths(num) {
  return Math.floor(num / 10)
}
