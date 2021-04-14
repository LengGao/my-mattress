import request from '@/utils/request'
// 其他

export function create (params) {
  return request({
      url: '/admin/other_product/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/other_product/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/other_product/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/other_product/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/other_product/paginate',
      method: 'get',
      params: params
  })
}

export function ban (params) {
  return request({
      url: '/admin/other_product/change_status',
      method: 'POST',
      params: params
  })
}

export function allTypes (params) {
  return request({
      url: '/admin/other_product/types',
      method: 'get',
      params: params
  })
}

