<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @item-click="itemClick" ref="tabControl2" v-show="isShowTab" class="tabControl"></tab-control>
    <scroll class="content" ref="scroll" :probe-type = '3' @contentScroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :cbanners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend-view :crecommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @item-click="itemClick" ref="tabControl1"></tab-control>
      <goods-list :goods="goods[currentIndex].list"></goods-list>
    </scroll>
    <go-back @click.native="goBack" v-show="isShowBack"></go-back>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'
  import Scroll from 'components/common/scroll/BScroll'
  import GoBack from 'components/content/goBack/GoBack'

  import GoodsList from 'components/content/goods/GoodsList'
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  import {gethomemultidata,gethomegoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentIndex: 'pop',
        isShowBack: false,
        isShowTab: false,
        scrollY: 0
      }
    },
    components:{
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoBack,

      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    created(){
      this.gethomemultidata(),
        // 请求商品数据
      this.gethomegoods('pop')
      this.gethomegoods('new')
      this.gethomegoods('sell')
    },
    activated(){
      // 回到滚动的区域
      this.$refs.scroll.refresh()
      this.$refs.scroll.goBack(0,this.scrollY,0);
    },
    deactivated(){
      // 记录滚动的位置
      this.scrollY = this.$refs.scroll.scroll.y
    },
    mounted(){
      // 接受图片加载完成的信号 运用防抖
      const refresh = debounce(this.$refs.scroll.refresh,80);
      this.$bus.$on('itemImgLoad',()=>{
        // 每当一张图片加载完成后就让better-scroll重新计算一下可滚动的区域
        refresh();
      })
    },
    methods:{
      // 事件监听相关方法
      itemClick(index){
        switch(index){
          case 0:
            this.currentIndex = 'pop'
            break
          case 1:
            this.currentIndex = 'new'
            break
          case 2:
            this.currentIndex = 'sell'
            break
        };
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      goBack(){
        this.$refs.scroll.goBack(0,0);
      },
      contentScroll(position){
        // 监听返回顶部
        this.isShowBack = Math.abs(position.y) > 1000;
        // 监听tabControl
        this.isShowTab = Math.abs(position.y) >= 619;
      },
      loadMore(){
        this.gethomegoods(this.currentIndex);
        this.$refs.scroll.finishPullUp();
      },
      swiperImgLoad(){
        // console.log(this.$refs.tabControl1.$el.offsetTop);
      },
      // 网络请求相关方法
      gethomemultidata(){
        gethomemultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      // 请求商品数据
      gethomegoods(type){
          gethomegoods(type,this.goods[type].page+1).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page++;
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    height:100vh;
    position: relative;
  }
  .home-nav {
    background-color:var(--color-high-text);
    font-size: 20px;
    font-weight: bold;
    letter-spacing:5px;
    color: #eee;
  }
  .content {
    height:calc(100% - 93px);
    overflow: hidden;
  }
  .tabControl {
    position: fixed;
    z-index: 1000;
  }
</style>
