import request from '@/api/request'

export function genCode(params) {
  return request({
    url: 'coder/genCode',
    method: 'post',
    data: params
  })
}
