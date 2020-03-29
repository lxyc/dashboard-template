import Vue from 'vue'
import Vuex from 'vuex'

import { SD_CODE } from './constants'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    currAdcode: SD_CODE, // 当前行政编码
    currLevel: 'province', // 当前行政层级 province / city / district / town
    currMapActive: 20, // 当前地图 10=交易地图 20=分布地图 11=地图排行
    dealList: [], // 交易数据列表(截取))
    dealListAll: [], // 交易数据列表(完整)
    leftRelateList: [], // 左侧联动信息
    currWorkType: -1, // 当前左侧活跃按钮
    selectedPopupInfo: {}, // 选中弹窗信息
    deplloyList: [] // 分布地图服务点
  },
  getters: {
    dealPointers: state => {
      return state.dealList.map(item => {
        const gpsGeocoordsys = item.gpsGeocoordsys ? JSON.parse(item.gpsGeocoordsys) : {}
        return { ...item, ...gpsGeocoordsys }
      })
    },
    adcode: state => {
      return String(state.currAdcode).replace('_', '')
    }
  },
  mutations: {
    // 更新行政编码
    updateAdcode(state, adcode) {
      state.currAdcode = adcode
      state.currWorkType = -1
    },
    // 更新行政层级
    updateCurrLevel(state, level) {
      state.currLevel = level
    },
    // 重置行政编码
    resetAdcode(state) {
      state.currAdcode = SD_CODE
    },
    // 地图切换，切换地图时需要重置行政编码
    changeCurrMapActive(state, active) {
      if (active !== state.currMapActive) {
        state.currMapActive = active
        state.currAdcode = SD_CODE
        if (active !== 11) {
          state.currWorkType = -1
        }
      }
    },
    // 更新实时交易数据(截取)
    updateDealList(state, list) {
      state.dealList = list
    },
    // 更新实时交易数据(完整)
    updateDealListAll(state, list) {
      state.dealListAll = list
    },
    // 更新左侧联动信息
    updateLeftRelateList(state, list) {
      state.leftRelateList = list
    },
    // 更新左侧活跃按钮
    updateCurrWorkType(state, id) {
      state.currWorkType = id
    },
    // 更新弹窗信息
    updateSelectedPopupInfo(state, data = {}) {
      state.selectedPopupInfo = data
    },
    // 更新分布地图列表
    updateDeplloyList(state, list = []) {
      state.deplloyList = list
    }
  },
  actions: {}
})
