export default [
  {
    // [交易地图]左侧按钮标点
    url: '/mock/demo',
    type: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        count: 0,
        data: {
          msg: 'mock demo run success'
        }
      }
    }
  }
]
