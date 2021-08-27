import request from '@/api/request'

export function getTableList(params) {
  return request({
    url: 'database/get-table-list',
    method: 'get',
    params: params
  })
}
