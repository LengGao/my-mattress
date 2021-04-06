
const tempRoutes = [
    // 设置
    {
        parentName: 'infrastructure',
        route: {
        path: 'stores/modify',
        component: () => import('@/views/infrastructure/store/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'infrastructure',
        route: {
        path: 'role/modify',
        component: () => import('@/views/infrastructure/role/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'infrastructure',
        route: {
        path: 'menu/modify',
        component: () => import('@/views/infrastructure/menu/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'infrastructure',
        route: {
        path: 'user/modify',
        component: () => import('@/views/infrastructure/user/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'infrastructure',
        route: {
        path: 'organization/modify',
        component: () => import('@/views/infrastructure/organization/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'infrastructure',
        route: {
        path: 'range/modify',
        component: () => import('@/views/infrastructure/range/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'infrastructure',
        route: {
        path: 'dataDictionary/modify',
        component: () => import('@/views/infrastructure/dataDictionary/modify'),
        meta: { title: '操作页'}
        }
    },
    // 产品
    {
        parentName: 'commodity',
        route: {
        path: 'attribute/modify',
        component: () => import('@/views/commodity/attribute/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'commodity',
        route: {
        path: 'dimension/modify',
        component: () => import('@/views/commodity/dimension/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'commodity',
        route: {
        path: 'product/modify',
        component: () => import('@/views/commodity/product/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'commodity',
        route: {
        path: 'attributeCombination/modify',
        component: () => import('@/views/commodity/attributeCombination/modify'),
        meta: { title: '操作页'}
        }
    },
    // 会员管理
    {
        parentName: 'member',
        route: {
        path: 'member/modify',
        component: () => import('@/views/member/member/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'member',
        route: {
        path: 'arrivalrecord/modify',
        component: () => import('@/views/member/member/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'member',
        route: {
        path: 'orderrecord/modify',
        component: () => import('@/views/member/member/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'member',
        route: {
        path: 'addressinfo/modify',
        component: () => import('@/views/member/member/modify'),
        meta: { title: '操作页'}
        }
    },
    // 营销
    {
        parentName: 'promotion',
        route: {
        path: 'coupons/modify',
        component: () => import('@/views/promotion/coupons/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'promotion',
        route: {
        path: 'couponDistribution/modify',
        component: () => import('@/views/promotion/couponDistribution/modify'),
        meta: { title: '操作页'}
        }
    },    
    {
        parentName: 'promotion',
        route: {
        path: 'couponUsage/modify',
        component: () => import('@/views/promotion/couponUsage/modify'),
        meta: { title: '操作页'}
        }
    },
    // 订单管理 
    {
        parentName: 'order',
        route: {
        path: 'downOrders/modify',
        component: () => import('@/views/order/downOrders/modify'),
        meta: { title: '操作页'}
        }
    },    
    {
        parentName: 'order',
        route: {
        path: 'orderInquiry/modify',
        component: () => import('@/views/order/orderInquiry/modify'),
        meta: { title: '操作页'}
        }
    },
    {
        parentName: 'order',
        route: {
        path: 'orderProcessingFlow/modify',
        component: () => import('@/views/order/orderProcessingFlow/modify'),
        meta: { title: '操作页'}
        }
    },
    // 客服
    {
        parentName: 'customerService',
        route: {
        path: 'agent/modify',
        component: () => import('@/views/customerService/agent/modify'),
        meta: { title: '操作页'}
        }
    },    
    {
        parentName: 'customerService',
        route: {
        path: 'agentallocation/modify',
        component: () => import('@/views/customerService/agentallocation/modify'),
        meta: { title: '操作页'}
        }
    },    

]

export default tempRoutes