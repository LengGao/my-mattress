import request from '@/utils/request'

/**
 * 创建角色
 * @param {object} params name,sort排序(number)
 */
export function createRole(params) {
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
export function deleteRole(id) {
  return request({
    url: '/admin/role/delete',
    method: 'post',
    params: { id }
  })
}

/**
 * 修改角色
 * @param {object} params id,name,sort
 */
export function updateRole(params) {
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
export function searchRole(name) {
  return request({
    url: '/admin/role/paginate',
    method: 'get',
    params: { name }
  })
}

/**
 * 查询角色详情
 * @param {object} params 
 */
export function getRole(id) {
  return request({
    url: '/admin/role/get',
    method: 'get',
    params: { id }
  })
}

/**
 * 创建角色
 * @param {object} params page=1,size=20,role_id,name,status
 */
export function getRoleList(params) {
  return request({
    url: '/admin/role/users',
    method: 'get',
    params
  })
}
