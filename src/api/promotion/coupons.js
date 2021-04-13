import request from '@/utils/request'
//  优惠券方案

export function create (params) {
  return request({
      url: '/admin/coupon/create',
      method: 'get',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/coupon/update',
      method: 'POST',
      params: params
  })
}

export function search (params) {
  return request({
      url: '/admin/coupon/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/coupon/paginate',
      method: 'get',
      params: params
  })
}

export function ban (params) {
  return request({
      url: '/admin/coupon/change_status',
      method: 'POST',
      params: params
  })
}
