import request from '@/utils/request'
// 优惠券发放


export function create (params) {
  return request({
      url: '/admin/coupon_activity/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/coupon_activity/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/coupon_activity/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/coupon_activity/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/coupon_activity/paginate',
      method: 'get',
      params: params
  })
}

// 有效的优惠券列表
export function valids (params) {
  return request({
      url: '/admin/coupon_activity/valid_coupons',
      method: 'get',
      params: params
  })
}
export function ban (params) {
  return request({
      url: '/admin/coupon_activity/change_status',
      method: 'POST',
      params: params
  })
}
