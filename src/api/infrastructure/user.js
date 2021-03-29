import request from '@/utils/request'

/**
 * 员工列表
 * @param {object} params：page=1,size=20,dept_id组织架构Id，name,status
 */ 
export function all(params){
  return request({
    url: '/admin/user/paginate',
    method: 'get',
    params
  })
}

export function create(params){
  return request({
    url: '/admin/user/create',
    method: 'post',
    params
  })
}

/**
 * 员工详情
 * @param {*} id 
 */
export function search(params) {
  return request({
    url: '/admin/user/get',
    method: 'get',
    params
  })
}

/**
 * 修改员工信息 
 * @param {object} params id，name，phone，dept_id，role_ids，entry_time入职时间，格式：2020-10-23，status，gender性别：leave_time离职时间，email，id_card_no身份证
 */
export function update(params){
  return request({
    url: '/admin/user/update',
    method: 'post',
    params
  })
}

/**
 * 禁用员工
 * @param {Object} params id，status 
 */
export function ban(params) {
  return request({
    url: '/admin/user/change_status',
    method: 'post',
    params
  })
}

/**
 * 
 * @param {*} params  {id}
 * @returns 
 */
export function reset(params) {
  return request({
    url: '/admin/user/repassword',
    method: 'post',
    params
  })
}