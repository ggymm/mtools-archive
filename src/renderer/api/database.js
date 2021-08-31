import request from '@/api/request'

export function getDBList() {
  return request({
    url: 'database/db-list',
    method: 'get'
  })
}

export function getTableList(params) {
  return request({
    url: 'database/table-list',
    method: 'get',
    params: params
  })
}
