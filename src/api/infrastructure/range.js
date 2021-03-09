import request from '@/utils/request'

export function cerateRage(params) {
 return request({
   url: '/admin/region/create',
   method: 'post',
   params
 }) 
}

export function deleteRage(params) {
  return request({
    url: '/admin/region/delete',
    method: 'post',
    params
  }) 
 }

 export function updateeRage(params) {
  return request({
    url: '/admin/region/update',
    method: 'post',
    params
  }) 
 }

 /**
  * 省市区列表
  * @param {*} params page=1,size=20
  */
 export function searchRage(params) {
  return request({
    url: '/admin/region/paginate',
    method: 'GET',
    params
  }) 
 }

 export function getRage(id) {
  return request({
    url: '/admin/region/get',
    method: 'GET',
    params: { id }
  }) 
 }

 export function allRage(params) {
  return request({
    url: '/admin/region/all',
    method: 'get',
    params
  }) 
 }

 /**
  * 启用或禁用地区
  * @param {*} params id,status
  */
 export function banRage(params) {
  return request({
    url: '/admin/region/change_status',
    method: 'post',
    params
  }) 
 }