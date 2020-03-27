import http from '../utils/http'

/**
 * mock demo
 */
export function getData() {
  return http.get('/mock/demo')
}
