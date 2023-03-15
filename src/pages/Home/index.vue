<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
     <!--Home父组件：通过v-for遍历生成多个Floor组件
     Floor这个组件：自己在组件内部是没有发请求的，数据是父组件通过props给的-->
    <Floor v-for="(carousel,index) in floorList" :key='index' :list='carousel'></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入子组件
//发现三级联动在search模块中也使用，咱们将三级联动的组件注册为全局组件
//下面引入的是局部组件：定义、引入、注册、使用
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like'
import Floor from './Floor';
import Brand from './Brand';
import { mapState } from 'vuex';
export default {
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    //Home组件的组件挂载完毕，生命周期函数，通过Vuex发请求，获取Floor组件数据
  mounted() {
    this.$store.dispatch('home/getFloorList');
  },
  computed:{
    ...mapState('home',['floorList']),
  }
};
</script>

<style>

</style>