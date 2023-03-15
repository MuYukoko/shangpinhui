// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import Paysuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import myOrder from '@/pages/Center/myOrder'
// import groupOrder from '@/pages/Center/groupOrder'
export default [
    {
        name:'center',
        path:'/center',
        // 路由懒加载
        component: ()=>import('@/pages/Center'),
        meta:{show:true},
        children:[
            {
                path:'myorder',
                // 路由懒加载
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path:'grouporder',
                component: ()=>import('@/pages/Center/groupOrder'),
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        name:'paysuccess',
        path:'/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/pay'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        name:'pay',
        path:'/pay',
        component: ()=>import('@/pages/Pay'),
        meta:{show:true}
    },
    {
        name:'trade',
        path:'/trade',
        component: ()=>import('@/pages/Trade'),
        meta:{show:true}
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        name:'detail',
        path:'/detail/:skuId?',
        component: ()=>import('@/pages/Detail'),
        meta:{show:true}
    }
    ,
    {
        name:'home',
        path:'/home',
        component: ()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta:{show:true}
    },
    {
        name:'login',
        path:'/login',
        component: ()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        name:'register',
        path:'/register',
        component: ()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        path:'*',
        redirect:'/home'
    }
]