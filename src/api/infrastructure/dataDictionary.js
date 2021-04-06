import request from '@/utils/request'

export function create(params) {
    return request({
        url: '/admin/dictionary/create',
        method: 'post',
        params
    })
}

export function deleter(params) {
  return request({
      url: '/admin/dictionary/delete',
      method: 'post',
      params
  })
}

export function update(params) {
    return request({
        url: '/admin/dictionary/update',
        method: 'post',
        params
    })
}


export function search(params) {
    return request({
        url: '/admin/dictionary/get',
        method: 'get',
        params
    })
}

export function all(params) {
    return request({
        url: '/admin/dictionary/paginate',
        method: 'get',
        params
    })
}

export function ban(params) {
    return request({
        url: '/admin/dictionary/change_status',
        method: 'post',
        params
    })
}

// 数据字典分类
export function creates(params) {
  return request({
      url: '/admin/dirct_cate/create',
      method: 'post',
      params
  })
}

export function updates(params) {
  return request({
      url: '/admin/dirct_cate/update',
      method: 'post',
      params
  })
}

export function gets(params) {
  return request({
      url: '/admin/dirct_cate/get',
      method: 'GET',
      params
  })
}

export function alls(params) {
  return request({
      url: '/admin/dirct_cate/all',
      method: 'get',
      params
  })
}