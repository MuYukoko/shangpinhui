import { reqGetCode ,reqRegister,reqUserLogin,reqGetUserInfo,reqUserLogout} from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'
const actions={
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.data.code==200){
            commit('GetCode',result.data.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({commit},user){
        let result=await reqRegister(user)
        if(result.data.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogin({commit},user){
        let result= await reqUserLogin(user);
        if(result.data.code==200){
            commit('UserLogin',result.data.data.token);
            setToken(result.data.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result=await reqGetUserInfo()
        if (result.data.code==200) {
            commit('GetUserInfo',result.data.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogout({commit}){
        let result= await reqUserLogout();
        console.log(result);
        if(result.data.code==200){
            commit('UserLogout')
            removeToken();
        }
    }

}
const mutations={
    GetCode(state,code){
        state.code=code
    },
    UserLogin(state,token){
        state.token=token;
    },
    GetUserInfo(state,data){
        state.userInfo=data
    },
    UserLogout(state){
        state.token='';
        state.userInfo={}
    }
    
}
const getters={}
const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
export default {
    namespaced:true,
    actions,
    mutations,
    getters,
    state
}