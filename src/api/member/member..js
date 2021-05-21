import request from '@/utils/request'

export function create (params) {
  return request({
      url: '/admin/member/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/member/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/member/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/member/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/member/paginate',
      method: 'get',
      params: params
  })
}
