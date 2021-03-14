
const tempRoutes = [
    {
     parentName: 'infrastructure',
     route: {
        path: 'stores/modify',
        component: () => import('@/views/infrastructure/store/modify'),
        meta: { title: '操作页'}
     }
    }
]

export default tempRoutes