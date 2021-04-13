import request from '@/utils/request'
// 其他

export function create (params) {
  return request({
      url: '/admin/size/create',
      method: 'get',
      params: params
  })
}

export function deleter (params) {
  return request({
      url: '/admin/size/delete',
      method: 'POST',
      params: params
  })
}

export function update (params) {
  return request({
      url: '/admin/size/update',
      method: 'POST',
      params: params
  })
}
export function search (params) {
  return request({
      url: '/admin/size/get',
      method: 'get',
      params: params
  })
}

// 分页
export function all (params) {
  return request({
      url: '/admin/size/paginate',
      method: 'get',
      params: params
  })
}

export function ban (params) {
  return request({
      url: '/admin/size/change_status',
      method: 'POST',
      params: params
  })
}
