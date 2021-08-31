import request from '@/api/request'

export function getDBList() {
  return request({
    url: 'database/get-db-list',
    method: 'get'
  })
}

export function getTableList(params) {
  return request({
    url: 'database/get-table-list',
    method: 'get',
    params: params
  })
}
