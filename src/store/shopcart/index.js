import { reqShopCart , reqDeleteShopCart,reqUpdateShopCartChecked} from "@/api"
const actions={
    async getShopCart({commit}){
        let result= await reqShopCart()
        if(result.data.code=200){
            commit('GetShopCart',result.data.data)
        }
    },
    async deleteShopCart({commit},skuId){
        let result=await reqDeleteShopCart(skuId);
        if(result.data.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('file'))
        }
    },
    async updateShopCartChecked({commit},{skuId,isChecked}){
        let result=await reqUpdateShopCartChecked(skuId,isChecked);
        if(result.data.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[];
        getters.ShopCartList.cartInfoList.forEach(item => {
            let p= item.isChecked==1 ? dispatch('deleteShopCart',item.skuId) : '';
            PromiseAll.push(p)
        });
        return Promise.all(PromiseAll)
    },
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll=[];
        getters.ShopCartList.cartInfoList.forEach(item=>{
            let p= dispatch('updateShopCartChecked',{skuId:item.skuId,isChecked})
            PromiseAll.push(p)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations={
    GetShopCart(state,shopCartList){
        state.shopCartList=shopCartList;
    }
}
const state={
    shopCartList:[]
}
const getters={
    ShopCartList(state){
        return state.shopCartList[0]||{}
    }
}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}