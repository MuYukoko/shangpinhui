import trade from "@/store/trade/index.js";
import requests from "./ajax.js";
import mockReq from './mock.js'
export const reqCategoryList=()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
//轮播图
export const reqBannerList=()=>mockReq.get('/banner')
export const reqFloorList=()=>mockReq.get('/floor')
export const reqGetsearchinfo=(params)=>{
    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}
export const reqGoodsInfo=(skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'get'
    })
}
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>{
    return requests({
        method:'post',
        url:`/cart/addToCart/${skuId}/${skuNum}`
    })
}
export const reqShopCart=()=>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}
export const reqDeleteShopCart=(skuId)=>{
    return requests({
        method:'delete',
        url:`/cart/deleteCart/${skuId}`
    })
}
// /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateShopCartChecked=(skuId,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}
// /api/user/passport/sendCode/{phone}
export const reqGetCode=(phone)=>{
    return requests({
        url:`user/passport/sendCode/${phone}`,
        method:'get'
    })
}
// /api/user/passport/register
export const reqRegister=(user)=>{
    return requests({
        url:"user/passport/register",
        method:'post',
        data:user
    })
}
// /api/user/passport/login
export const reqUserLogin=(user)=>{
    return requests({
        url:'user/passport/login',
        method:'post',
        data:user
    })
}
// api/user/passport/auth/getUserInfo
export const reqGetUserInfo=()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}
// /api/user/passport/logout
export const reqUserLogout=()=>{
    return requests({
        url:'user/passport/logout',
        method:'get'
    })
}
// /api/user/userAddress/auth/findUserAddressList
export const reqUserAddressList=()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}
// /api/order/auth/trade
export const reqOrderInfo=()=>{
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post'
    })
}
// /api/payment/weixin/createNative/{orderId}
export const reqCreatNative=(orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus=(orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}
// /api/order/auth/{page}/{limit}
export const reqMyOrder=(page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}