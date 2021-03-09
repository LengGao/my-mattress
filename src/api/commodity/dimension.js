import request from '@/utils/request'

export function create (params) {
    return request({
        url: '/admin/size/paginate',
        method: 'get',
        params: params
    })
}

export function deleter (params) {
    return request({
        url: '',
        method: 'get',
        params: params
    })
}

export function update (params) {
    return request({
        url: '',
        method: 'get',
        params: params
    })
}
export function search (params) {
    return request({
        url: '/admin/size/paginate',
        method: 'get',
        params: params
    })
}
export function get (params) {
    return request({
        url: '',
        method: 'get',
        params: params
    })
}
export function all (params) {
    return request({
        url: '/admin/size/all',
        method: 'get',
        params: params
    })
}
export function ban (params) {
    return request({
        url: '',
        method: 'get',
        params: params
    })
}
