import request from '@/utils/request'

export function create(params) {
 return request({
   url: '/admin/region/create',
   method: 'post',
   params
 }) 
}

export function deleter(params) {
  return request({
    url: '/admin/region/delete',
    method: 'post',
    params
  }) 
 }

 export function update(params) {
  return request({
    url: '/admin/region/update',
    method: 'post',
    params
  }) 
 }

 /**
  * 省市区列表
  * @param {*} params page=1,size=20
  */
 export function all(params) {
  return request({
    url: '/admin/region/paginate',
    method: 'GET',
    params
  }) 
 }

 export function search(params) {
  return request({
    url: '/admin/region/get',
    method: 'get',
    params
  }) 
 }

 export function allRage(params) {
  return request({
    url: '/admin/region/all',
    method: 'get',
    params
  }) 
 }

 /**
  * 启用或禁用地区
  * @param {*} params id,status
  */
 export function ban(params) {
  return request({
    url: '/admin/region/change_status',
    method: 'post',
    params
  }) 
 }

 /**
  * 所有省
  * @param {*} [name] 地区名称
  */
export function provinces (params) {
  return request({
    url: '/admin/region/provinces',
    method: 'get',
    params
  })
}

/**
  * 所有市
  * @param {*} province_id 省id
  * @param {*} [name] 地区名称
  */
 export function cities (params) {
  return request({
    url: '/admin/region/cities',
    method: 'get',
    params
  })
}

/**
  * 所有区
  * @param {*} city_id 省id
  * @param {*} [name] 地区名称
  */
 export function districts (params) {
  return request({
    url: '/admin/region/districts',
    method: 'get',
    params
  })
}

/**
  * 所有子节点
  * @param {*} [parent_id] 父id
  */
 export function childrens (params) {
  return request({
    url: '/admin/region/children',
    method: 'get',
    params
  })
}

/**
 * 所有城市等级列表
 */
export function cityGenders () {
  return request({
    url: '/admin/region/city_gender',
    method: 'get',
  })
}