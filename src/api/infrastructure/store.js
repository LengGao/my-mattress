import request from '@/utils/request'

export function create(params) {
    return request({
        url: '/admin/shop/create',
        method: 'post',
        params
    })
}

export function update(params) {
    return request({
        url: '/admin/shop/update',
        method: 'post',
        params
    })
}

// 单个详情
export function search(params) {
    return request({
        url: '/admin/shop/get',
        method: 'get',
        params
    })
}

export function all(params) {
    return request({
        url: '/admin/shop/paginate',
        method: 'get',
        params
    })
}

export function ban(params) {
    return request({
        url: '/admin/shop/change_status',
        method: 'post',
        params
    })
}