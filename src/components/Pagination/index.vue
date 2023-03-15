<template>
  <div class="pagination">
    <button @click="$emit('getPageNo',pageNo-1)" :disabled='pageNo==1'>上一页</button>
    <button v-show="middleNum.star>1" @click="$emit('getPageNo',1)">1</button>
    <button v-show="middleNum.star>2">···</button>

    <button v-for='(page,index) in middleNum.end' :key="index" v-show="page>=middleNum.star" @click="$emit('getPageNo',page)" :class="{'active':pageNo==page}">{{page}}</button>
    
    <button v-show="middleNum.end<totalPage-1&&totalPage>continues">···</button>
    <button v-show="middleNum.end<totalPage&&totalPage>continues" @click="$emit('getPageNo',totalPage)" >{{totalPage}}</button>
    <button @click="$emit('getPageNo',pageNo+1)" :disabled='pageNo==totalPage'>下一页</button>
    
    <button style="margin-left: 30px">{{totalPage}}</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
      totalPage(){
        return Math.ceil(this.total/this.pageSize);
      },
      middleNum(){
        let star=0;
        let end=0;
        if(this.totalPage<this.continues){
          star=1;
          end=this.totalPage
        }else{
          star=this.pageNo-parseInt(this.continues/2);
          end=this.pageNo+parseInt(this.continues/2);
          if(star<1){
            star=1;
            end=this.continues
          }
          if(end>this.totalPage){
            end=this.totalPage;
            star=this.totalPage-this.continues+1;
          }
        }
        return {star,end}
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>