import request from '@/utils/request'

export function createStore(params) {
    return request({
        url: '/admin/shop/create',
        method: 'post',
        params
    })
}

export function updateStore(params) {
    return request({
        url: '/admin/shop/update',
        method: 'post',
        params
    })
}

export function getStore(params) {
    return request({
        url: '/admin/shop/get',
        method: 'post',
        params
    })
}

export function searchStore(params) {
    return request({
        url: '/admin/shop/paginate',
        method: 'post',
        params
    })
}

export function banStore(params) {
    return request({
        url: '/admin/shop/change_status',
        method: 'post',
        params
    })
}