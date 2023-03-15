import {reqGetsearchinfo} from '@/api'
const actions={
    async getSearchList({commit},params){
        let result=await reqGetsearchinfo(params)
        if(result.data.code===200){
            commit('GetSearchList',result.data.data)
        }
    }
}
const mutations={
    GetSearchList(state,value){
        state.searchInfo=value
    }
}
const state = {
    searchInfo:{}
}
const getters={
    goodsList(state){
        return state.searchInfo.goodsList||[]
    },
    attrsList(state){
        return state.searchInfo.attrsList||[]
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[]
    }
}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}