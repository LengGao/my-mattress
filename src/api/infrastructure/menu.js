import request from '@/utils/request'

export function createMenu(params) {
    return request({
        url: '/admin/menu/create',
        method: 'post',
        params
    })
}

export function deleteMenu(id) {
    return request({
        url: '/admin/menu/delete',
        method: 'post',
        params: { id }
    })
}

export function updateMenu(params) {
    return request({
        url: '/admin/menu/update',
        method: 'post',
        params
    })
}

export function getMenu(id) {
    return request({
        url: '/admin/menu/get',
        method: 'get',
        params: { id }
    })
}

export function allMenu(params) {
    return request({
        url: '/admin/menu/all_permissions',
        method: 'get',
        params
    })
}

export function banMenu(params) {
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