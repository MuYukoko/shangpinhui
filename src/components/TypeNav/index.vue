<template>
  <div class="type-nav">
    <div class="container">
      <div  @mouseleave="leaveIt" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动结构||过渡动画效果-->
        <transition name="sort">
          <div class="sort" v-show='show'>
          <div class="all-sort-list2">
            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId" @click="goSearch">
              <h3 @mouseenter="enterIt(c1.categoryId)" :class="{ cur: c1.categoryId === currentNum }">
                <a  href="javascript:"  :data-categoryName="c1.categoryName"  :data-category1Id="c1.categoryId"  >{{ c1.categoryName }}
                </a>
              </h3>
              <div class="item-list clearfix" :style="{ display: currentNum === c1.categoryId ? 'block' : 'none', }">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" >{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="javascript:" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" >{{ c3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 应用于事件的节流
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentNum: -1,
      show:true
    };
  },
  mounted() {
    if(this.$route.path!='/home'){
      this.show=false
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    //h3的鼠标移入事件:用户行为如果过快，会出现浏览器反应不过来的现象----【用户行为太快】
    //回调函数里面业务代码很多，卡顿、业务没有完整完成。
    //节流功能
    enterIt: throttle(function (index) {
      this.currentNum = index;
    }, 50),
    leaveIt() {
      this.currentNum = -1;
      if(this.$route.path!='/home'){
        this.show=false
      }
    },
    goSearch: throttle(function (event) {
      let location={name:'search'}
      let query={}
      //给a标签添加自定义属性data-categoryName，保证这个节点带data-categoryName，一定是a标签
      //可以通过节点的dataset属性获取相应节点的自定义属性，返回的是一个对象KV【自定义属性相关的】
      //如果带有categoryname字段的一定是a标签
      if (event.target.dataset.categoryname) {
        query.categoryName=event.target.dataset.categoryname
        if (event.target.dataset.category1id) {
          query.category1Id = event.target.dataset.category1id;
        } else if (event.target.dataset.category2id) {
          query.category2Id = event.target.dataset.category2id;
        } else {
          query.category3Id = event.target.dataset.category3id;
        }
      }
      location.query=query
      if(this.$route.params){
        location.params=this.$route.params
      }
      this.$router.push(location);
    }, 50),
    enterShow(){
      this.show=true
    }
  },
};
</script>
<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration-line: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
//过渡动画的样式
    //如果transiton没有name属性 ： v-enter   v-enter-to v-enter-active
    //如果transition有name属性  ： name的属性值-enter  name的属性值-enter-to
    //进入状态：开始阶段
    .sort-enter{
      height: 0;
    }
    //进入状态：结束阶段
    .sort-enter-to{
      height: 461px;
    }
    // 进入过程中，定义过渡动画时间等
    .sort-enter-active{
      transition: all 1s linear;
    }
  }
}
</style>