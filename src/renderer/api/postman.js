import request from '@/api/request'

export function getCollectionTree() {
  return request({
    url: 'postman/collection/tree',
    method: 'get'
  })
}

export function createCollection(params) {
  return request({
    url: 'postman/collection/create',
    method: 'post',
    data: params
  })
}
