import request from '@/utils/request'

export function create(params) {
    return request({
        url: '/admin/menu/create',
        method: 'post',
        params
    })
}

export function deleter(id) {
    return request({
        url: '/admin/menu/delete',
        method: 'post',
        params: { id }
    })
}

export function update(params) {
    return request({
        url: '/admin/menu/update',
        method: 'post',
        params
    })
}

export function search(id) {
    return request({
        url: '/admin/menu/get',
        method: 'get',
        params: { id }
    })
}

export function all(params) {
    return request({
        url: '/admin/menu/all_permissions',
        method: 'get',
        params
    })
}

export function ban(params) {
    return request({
        url: '/admin/menu/change_status',
        method: 'post',
        params
    })
}

// 设置角色权限
export function setRolePower(params) {
    return request({
        url: '/admin/menu/set_role_permissions',
        method: 'post',
        params
    })
}

// 角色权限列表
export function allRolePowerList(role_id) {
    return request({    
        url: '/admin/menu/role_permissions',
        method: 'get',
        params: { role_id }
    })
}

// 用户权限列表
export function userRoleList(user_id) {
    return request({
        url: '/admin/menu/user_permissions',
        method: 'get',
        params: { user_id}
    })
}