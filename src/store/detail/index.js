import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api";
import { getUUID } from "@/utils/uuid_token";
const actions={
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.data.code==200){
            commit('GetGoodsInfo',result.data.data)
        }
    },
    // 让服务器记录一下，都有谁要添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.data.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('file'))
        }
    }
};
const mutations={
    GetGoodsInfo(state,GoodsInfo){
        state.GoodsInfo=GoodsInfo
    }
};
const state={
    GoodsInfo:{},
    uuid_token:getUUID()
};
const getters={
    categoryView(state){
        return state.GoodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.GoodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.GoodsInfo.spuSaleAttrList||[]
    }
}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}