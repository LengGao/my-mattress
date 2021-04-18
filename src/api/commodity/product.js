import request from '@/utils/request'
// 产品

export function create (params) {
  return request({
      url: '/admin/product/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/product/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/product/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/product/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/product/paginate',
      method: 'get',
      params: params
  })
}


export function ban (params) {
  return request({
      url: '/admin/product/change_status',
      method: 'POST',
      params: params
  })
}

// 适用范围列表
export function scopes (params) {
  return request({
      url: '/admin/product/scopes',
      method: 'get',
      params: params
  })
}

// 产品属性列表
export function allAttributes (params) {
  return request({
      url: '/admin/product/sku_list',
      method: 'get',
      params: params
  })
}

// 产品类型列表
export function allTypes (params) {
  return request({
      url: '/admin/product/types',
      method: 'get',
      params: params
  })
}

// 上传图片
export function upImage (file) {
  return request({
      url: '/admin/product/upload',
      method: 'post',
      params: file
  })
}

export const uploadUrl = process.env.NODE_ENV === 'development' ? 'http://8.136.183.159:8081' : process.env.VUE_APP_BASE_API
