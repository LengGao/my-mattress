
const tempRoutes = [
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
    {
        parentName: 'member',
        route: {
        path: 'member/modify',
        component: () => import('@/views/member/member/modify'),
        meta: { title: '操作页'}
        }
    },
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

]

export default tempRoutes