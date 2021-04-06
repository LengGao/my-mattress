import request from '@/utils/request'

/**
 * 创建角色
 * @param {object} params name,sort排序(number)
 */
export function create(params) {
  return request({
    url: '/admin/role/create',
    method: 'post',
    params
  })
}

/**
 * 删除角色
 * @param {object} params  id
 */
export function deleter(params) {
  return request({
    url: '/admin/role/delete',
    method: 'post',
    params
  })
}

/**
 * 修改角色
 * @param {object} params id,name,sort
 */
export function update(params) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    params
  })
}

/**
 * 查询角色
 * @param {object} params name
 */
export function searchRole(params) {
  return request({
    url: '/admin/role/paginate',
    method: 'get',
    params
  })
}

/**
 * 查询角色详情
 * @param {object} params 
 */
export function search(params) {
  return request({
    url: '/admin/role/get',
    method: 'get',
    params
  })
}

/**
 * 创建角色
 * @param {object} params page=1,size=20,role_id,name,status
 */
export function all(params) {
  return request({
    url: '/admin/role/users',
    method: 'get',
    params
  })
}
