import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)
const originPush=VueRouter.prototype.push
const originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
let router= new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})
router.beforeEach(async(to,from,next)=>{
    let token=store.state.user.token
    let userName=store.state.user.userInfo.name;
    if(token){
        if(to.path=='/login'||to.path=='/register'){
            next('/home')
        }else{
            if(userName){
                next()
            }else{
                try {
                    await store.dispatch('user/getUserInfo');
                    next()
                } catch (error) {
                    await store.dispatch('user/userLogout');
                    next('/login')
                }
            }
        }
    }else{
        if(to.path.indexOf('trade')!=-1||to.path.indexOf('shopcart')!=-1||to.path.indexOf('pay')!=-1){
            next(`/login?redirect=${to.path}`)
        }else{
            next()
        }
        
    }
})
export default router;