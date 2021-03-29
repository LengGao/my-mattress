import request from '@/utils/request'
// 组织架构

export function create(params) {
    return request({
        url: '/admin/department/create',
        method: 'post',
        params
    })
}

/**
 * @param {*} params {id: string}
 * @returns 
 */
export function deleter(params) {
    return request({
        url: '/admin/department/delete',
        method: 'post',
        params
    })
}

export function update(params) {
    return request({
        url: '/admin/department/create',
        method: 'post',
        params
    })
}

export function all() {
    return request({
        url: '/admin/department/all',
        method: 'get'
    })
}

export function search(params) {
    return request({
        url: '/admin/department/get',
        method: 'get',
        params
    })
}

export function ban(params) {
    return request({
        url: '/admin/department/change_status',
        method: 'post',
        params
    })
}

