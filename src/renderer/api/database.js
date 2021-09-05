import request from '@/api/request'

export function getDBList() {
  return request({
    url: 'database/list',
    method: 'get'
  })
}

export function getTableList(params) {
  return request({
    url: 'database/tableList',
    method: 'get',
    params: params
  })
}
