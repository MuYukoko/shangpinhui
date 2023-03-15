import { reqCategoryList ,reqBannerList,reqFloorList} from "@/api"
const actions={
    async getCategoryList({commit}){
        const result= await reqCategoryList()
        if (result.data.code===200){commit('GetCategoryList',result.data.data)}
    },
    async getBannerList({commit}){
        const result = await reqBannerList()
        if(result.data.code===200){commit('GetBannerList',result.data.data);}
    },
    async getFloorList({commit}){
        const result=await reqFloorList()
        if(result.data.code==200){
            commit('GetFloorList',result.data.data)
        }
    }
}
const mutations={
    GetCategoryList(state,categoryList){
        state.categoryList=categoryList.slice(0,16)
    },
    GetBannerList(state,bannerList){
        state.bannerList=bannerList
    },
    GetFloorList(state,floorList){
        state.floorList=floorList
    }
}
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters={
}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}