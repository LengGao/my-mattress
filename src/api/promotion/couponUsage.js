import request from '@/utils/request'
// 优惠券使用情况


// 优惠券使用明细列表
export function all_Details (params) {
  return request({
      url: '/api/admin/coupon_member/paginate_statics',
      method: 'get',
      params: params
  })
}

// 优惠券会员明细列表
export function all_Merbers (params) {
  return request({
      url: '/api/admin/coupon_member/paginate_member',
      method: 'get',
      params: params
  })
}
