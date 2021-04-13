import request from '@/utils/request'

export function save (params) {
  return request({
      url: '/admin/order/save',
      method: 'get',
      params: params
  })
}

export function cancel (params) {
  return request({
      url: '/admin/order/cancel',
      method: 'POST',
      params: params
  })
}

// 发货
export function send (params) {
  return request({
      url: '/admin/order/send',
      method: 'POST',
      params: params
  })
}

export function pay (params) {
  return request({
      url: '/admin/order/pay',
      method: 'POST',
      params: params
  })
}

export function search (params) {
  return request({
      url: '/admin/order/get',
      method: 'get',
      params: params
  })
}

export function all (params) {
  return request({
      url: 'api/admin/order/paginate',
      method: 'GET  ',
      params: params
  })
}

// 客户列表
export function allClient (params) {
  return request({
      url: '/admin/order/members',
      method: 'get',
      params: params
  })
}

// 产品详情使用 产品模块接口

// 可用产品列表
export function canUseProducts (params) {
  return request({
      url: '/admin/order/products',
      method: 'GET  ',
      params: params
  })
}


