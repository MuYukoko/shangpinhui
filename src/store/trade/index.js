import { reqUserAddressList , reqOrderInfo} from "@/api"
const actions={
    async getUserAddress({commit}){
        let result= await reqUserAddressList();
        if(result.data.code==200){
            commit('GetUserAddress',result.data.data)
        }
    },
    async getOrderInfo({commit}){
        let result=await reqOrderInfo();
        if(result.data.code=200){
            commit('GetOrderInfo',result.data.data)
        }
    }
}
const mutations={
    GetUserAddress(state,data){
        state.userAddressList=data
    },
    GetOrderInfo(state,data){
        state.orderInfo=data
    }
}
const state={
    userAddressList:[],
    orderInfo:{}
}
const getters={}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}