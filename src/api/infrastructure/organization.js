import request from '@/utils/request'
// 组织架构

export function createOrganization(params) {
    return request({
        url: '/admin/department/create',
        method: 'post',
        params
    })
}

export function deleteOrganization(id) {
    return request({
        url: '/admin/department/delete',
        method: 'post',
        params: { id }
    })
}

export function updateOrganization(params) {
    return request({
        url: '/admin/department/create',
        method: 'post',
        params
    })
}

export function allOrganization(params) {
    return request({
        url: '/admin/department/all',
        method: 'get',
        params
    })
}

export function getOrganization(params) {
    return request({
        url: '/admin/department/get',
        method: 'get',
        params
    })
}

export function banOrganization(params) {
    return request({
        url: '/admin/department/change_status',
        method: 'post',
        params
    })
}

