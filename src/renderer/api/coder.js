import request from '@/api/request'

export function generateJavaCode(params) {
  return request({
    url: 'coder/generateJavaCode',
    method: 'post',
    data: params
  })
}

export function generateGoCode(params) {
  return request({
    url: 'coder/generateGoCode',
    method: 'post',
    data: params
  })
}
