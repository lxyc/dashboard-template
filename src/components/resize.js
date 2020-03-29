import { debounce } from 'lodash'

const DEFAULT_SIZE = [
  {
    screenWidth: 2304,
    screenHeight: 1024,
    className: 'layout-1'
  },
  {
    screenWidth: 2304,
    screenHeight: 1024,
    className: 'layout-1'
  }
]

export default {
  data() {
    return {
      layoutIndex: 0,
      isReady: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$dashboard = document.querySelector('.dashboard')
      this.computeScale()
      this.isReady = true
      window.addEventListener('resize', debounce(this.computeScale, 200))
    })
  },
  methods: {
    computeScale() {
      let scaleVal = 1
      const { innerHeight: height, innerWidth: width } = window
      // 视口长宽比判断使用哪种布局
      this.layoutIndex = width / height > 3 ? 1 : 0
      let { screenWidth, screenHeight, className } = this._getSize(this.layoutIndex)

      if ((height * screenWidth) / screenHeight < width) {
        scaleVal = height / screenHeight
      } else {
        scaleVal = width / screenWidth
      }

      this.$dashboard.style.transform = `scale(${scaleVal}) translate3d(-50%, -50%, 0)`
      this.$dashboard.className = `oh dashboard ${className}`
    },
    _getSize(index = 0) {
      return DEFAULT_SIZE[index]
    }
  }
}
