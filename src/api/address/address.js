import request from '@/utils/request'

export function create (params) {
  return request({
      url: '/admin/address/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/address/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/address/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/address/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/address/paginate',
      method: 'get',
      params: params
  })
}

// 设置默认地址
export function defaultAddress (params) {
  return request({
      url: '/admin/address/set_default',
      method: 'POST',
      params: params
  })
}
