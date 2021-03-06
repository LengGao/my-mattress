import request from '@/utils/request'
// 属性

export function create (params) {
  return request({
      url: '/admin/attribute/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/attribute/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/attribute/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/attribute/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/attribute/paginate',
      method: 'get',
      params: params
  })
}

// 所属性
export function get (params) {
  return request({
      url: '/admin/attribute/all',
      method: 'get',
      params: params
  })
}

export function ban (params) {
  return request({
      url: '/admin/attribute/change_status',
      method: 'POST',
      params: params
  })
}
