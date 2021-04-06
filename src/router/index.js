/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import tempRoutes from './temp-routes'

// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    name: 'temp',
    children: [{
      path: 'temp',
      name: 'temp',
      component: () => import('@/views/temp/temp/index'),
      meta: { title: '测试页面', icon: 'dashboard' }
    }]
  },

  {
    path: '/infrastructure',
    component: Layout,
    redirect: '/infrastructure/organization',
    name: 'infrastructure',
    meta: { title: '设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/infrastructure/organization/index'),
        meta: { title: '组织架构', icon: 'tree' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/infrastructure/user/index'),
        meta: { title: '员工管理', icon: 'user' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/infrastructure/role/index'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'stores',
        name: 'stores',
        component: () => import('@/views/infrastructure/store/index'),
        meta: { title: '门店管里', icon: 'table' }
      },
      {
        path: 'dataDictionary',
        name: 'dataDictionary',
        component: () => import('@/views/infrastructure/dataDictionary/index'),
        meta: { title: '数据字典', icon: 'table' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/infrastructure/menu/index'),
        meta: { title: '菜单管理', icon: 'table' }
      },
      {
        path: 'range',
        name: 'range',
        component: () => import('@/views/infrastructure/range/index'),
        meta: { title: '区域管理', icon: 'table' }
      }
    ]
  },
  
  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/attribute',
    name: 'commodity',
    meta: {title: '产品', icon: 'nested' },
    children: [
      {
        path: 'attribute',
        name: 'attribute',
        component: () => import('@/views/commodity/attribute/index'), // Parent router-view
        meta: { title: '属性管理' }
      },
      {
        path: 'dimension',
        name: 'dimension',
        component: () => import('@/views/commodity/dimension/index'),
        meta: { title: '尺寸管理' }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/commodity/product//index'),
        meta: { title: '产品管理' }
      },
      {
        path: 'attributeCombination',
        name: 'attributeCombination',
        component: () => import('@/views/commodity/attributeCombination/index'),
        meta: { title: '产品属性组合' }
      }
    ]
  },

  // {
  //   path: '/store',
  //   component: Layout,
  //   redirect: '/store/QRcode',
  //   name: 'store',
  //   meta: { title: '门店管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'QRcode',
  //       name: 'QRcode',
  //       component: () => import('@/views/store/QRcode/index'),
  //       meta: { title: '二维码管理', icon: 'example' }
  //     },
  //     {
  //       path: 'equipment',
  //       name: 'equipment',
  //       component: () => import('@/views/store/equipment/index'),
  //       meta: { title: '设备管理', icon: 'example' }
  //     }
  //   ]
  // },

  {
    path: '/promotion',
    component: Layout,
    redirect: '/promotion/coupons',
    name: 'promotion',
    meta: { title: '营销', icon: 'form' },
    children: [
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('@/views/promotion/coupons/index'),
        meta: { title: '优惠券方案管理', icon: 'table' }
      },
      {
        path: 'couponDistribution',
        name: 'couponDistribution',
        component: () => import('@/views/promotion/couponDistribution/index'),
        meta: { title: '优惠券发放设置', icon: 'table' }
      },
      {
        path: 'couponUsage',
        name: 'couponUsage',
        component: () => import('@/views/promotion/couponUsage/index'),
        meta: { title: '优惠券使用情况', icon: 'table' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderInquiry',
    name: 'Example',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    children: [
      {
      path: 'downOrders',
      name: 'downOrders',
        component: () => import('@/views/downOrders/downOrders/index'),
        meta: { title: '下单', icon: 'dashboard' }
      },
      {
        path: 'orderInquiry',
        name: 'orderInquiry',
        component: () => import('@/views/order/orderInquiry/index'),
        meta: { title: '订单查询', icon: 'link' }
      },
      {
        path: 'orderProcessingFlow',
        name: 'orderProcessingFlow',
        component: () => import('@/views/order/orderProcessingFlow/index'),
        meta: { title: '订单处理流程', icon: 'nested' }
      }
    ]
  },

  
  {
    path: '/member',
    component: Layout,
    redirect: '/member/member',
    name: 'member',
    meta: { title: '会员管理', icon: 'example' },
    children: [
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/member/member/index'),
        meta: { title: '会员管理', icon: 'table' }
      },
      {
        path: 'arrivalrecord',
        name: 'arrivalrecord',
        component: () => import('@/views/member/arrivalrecord/index'),
        meta: { title: '到店记录', icon: 'table' }
      },
      {
        path: 'orderrecord',
        name: 'orderrecord',
        component: () => import('@/views/member/orderrecord/index'),
        meta: { title: '订单记录', icon: 'table' }
      },
      {
        path: 'addressinfo',
        name: 'addressinfo',
        component: () => import('@/views/member/addressinfo/index'),
        meta: { title: '地址信息', icon: 'table' }
      }
    ]
  },

  {
    path: '/customerService',
    component: Layout,
    redirect: '/customerService/agent',
    name: 'promotion',
    meta: { title: '客服管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/customerService/agent/index'),
        meta: { title: '坐席管理', icon: 'eye-open' }
      },
      {
        path: 'agentallocation',
        name: 'agentallocation',
        component: () => import('@/views/customerService/agentallocation/index'),
        meta: { title: '连锁门店坐席分配', icon: 'table' }
      }
    ]
  },



  // 404 page must be placed at the end !!!

  // { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  redirect: 'noRedirect',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
tempRoutes.forEach(item => {
  router.addRoute(item.parentName,item.route)  
})



// router.addRoutes(tempRoutes)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

/**
 * service vimes     2tab
 * infrastructure         基础架构
 *    organization            组织架构
 *    user                    用户管理
 *    role                    角色管理
 *    store                   门店信息管理 +
 *    menu                    菜单管理 +
 *    range                   区域管理 +
 * store                  门店管理
 *    QRcode                  二维码管理
 *    equipment               设备管理
 * member                 会员管理
 *    mumber                  会员信息管理
 *    arrivalrecord           到店记录 +
 *    orderrecord             订单记录 +
 *    addressinfo             地址信息 + 
 * promotion              促销管理
 *    coupons                 优惠券方案
 *    couponDistribution      优惠券发放设置 +
 *    couponUsage             优惠券使用情况 +
 * customerService         客服管理
 *    agent                   坐席管理
 *    agentallocation         连锁门店坐席分配
 * downOrders               客服下单
 * order                    订单管理
 *    orderInquiry            订单查询
 *    orderProcessingFlow     订单处理流程
 * afterService             售后服务
 *     returnOrder            退货订单
 *     changeOrder            换货订单 +
 *     giftoOrder             赠品订单 +                     
 * commodity                商品管理
 *    attribute               属性管理
 *    dimension               尺寸管理
 *    product                 产品管理
 *    attributeCombination    产品属性组合
 * report                    报表 +
 *    storeSales                门店销售统计
 *    productSales              产品销售统计
 * 
 * service vimes     2tab   修订
 * infrastructure         设置
 *    organization            组织架构
 *    user                    员工管理
 *    role                    角色管理
 *    store                   门店管理 +
 *    menu                    菜单管理 +
 *    range                   区域管理 +
 *    dataDictionary          数据字典
 *
 * commodity                产品
 *    attribute               属性管理
 *    dimension               尺寸管理
 *    product                 产品管理
 *    attributeCombination    产品属性组合
 * 
 * 
 * store                  门店管理
 *    QRcode                  二维码管理
 *    equipment               设备管理
 * 
 * report                    报表 +
 *    storeSales                门店销售统计
 *    productSales              产品销售统计
 * 
 * member                 会员管理
 *    mumber                  会员信息管理
 *    arrivalrecord           到店记录 +
 *    orderrecord             订单记录 +
 *    addressinfo             地址信息 + 
 * 
 * promotion              营销
 *    coupons                 优惠券方案
 *    couponDistribution      优惠券发放设置 +
 *    couponUsage             优惠券使用情况 +
 * customerService         客服
 *    agent                   坐席管理
 *    agentallocation         连锁门店坐席分配
 * 
 * order                    订单
 *    downOrders              下单
 *    orders                  订单管理
 *    changeOrder             换货订单 +
 *    giftoOrder              赠品订单 + 
 *    returnOrder             退货订单 +         
 */
