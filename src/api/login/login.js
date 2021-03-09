import request from '@/utils/request'


export function login(params) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/user/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(id) {
  return request({
    url: '/admin/user/logout',
    method: 'post',
    params: { id }
  })
}

export function resetPwd(id) {
  return request({
    url: '/admin/user/repassword',
    method: 'post',
    params: { id }
  })
}