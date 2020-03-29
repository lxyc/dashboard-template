import Velocity from 'velocity-animate'

export default class AutoScroll {
  constructor({
    el, // 滚动容器
    disabled = false, // 禁止滚动
    duration = 1000, // 间隔滚动时长
    animateDuration = 1000, // 过渡动画时长
    itemHeight = 60, // 每条高度
    times = 10, // 滚动多少次重新请求数据
    spliceLen = 0, // dom条数
    getSourceData = () => {}, // 定时拉取数据
    getShowData = () => {} // 展示信息
  }) {
    this.el = el
    this.disabled = disabled
    this.duration = duration
    this.animateDuration = animateDuration
    this.itemHeight = itemHeight
    this.times = times
    this.spliceLen = spliceLen
    this.getData = getSourceData
    this.getShowData = getShowData

    this.tranEndTimes = 1
    this.timerID = null
    this.originItems = []
    this.items = []

    this.init()
  }

  init() {
    Promise.resolve(this.getData()).then(list => {
      this.tranEndTimes = 1
      this.el.marginTop = 0
      this.originItems = list
      this.items = this.spliceItems()
      this.getShowData(this.items)

      if (this.disabled) return
      this.timerID && clearInterval(this.timerID)
      this.timerID = setInterval(() => {
        this.scroll()
      }, this.duration + 1000)
    })
  }

  destoryed() {
    this.timerID && clearInterval(this.timerID)
  }

  scroll() {
    const element = this.el
    Velocity(
      element,
      {
        marginTop: `-${this.itemHeight}px`
      },
      {
        duration: this.animateDuration,
        begin: () => {
          if (this.tranEndTimes === this.times) {
            this.init()
          }
        },
        complete: () => {
          this.tranEndTimes += 1
          this.items = this.spliceItems()
          this.getShowData(this.items)
          element.style.marginTop = 0
        }
      }
    )
  }

  spliceItems() {
    if (this.originItems.length < this.spliceLen) {
      return [...this.originItems]
    }
    const startIndex = this.tranEndTimes - 1
    const diffVal = startIndex + this.spliceLen - this.originItems.length
    if (diffVal <= 0) {
      return this.originItems.slice(startIndex, startIndex + this.spliceLen)
    } else {
      return [...this.originItems.slice(startIndex), ...this.originItems.slice(0, diffVal)]
    }
  }
}
