<template>
  <div id="detail">
    <detail-nav class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav>
    <scroll class="detail-scroll" ref="detailScroll" :probe-type="3" @contentScroll="scroll">
      <detail-swiper :swiper-img="swiperImg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="goodsInfoLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <go-back @click.native="goBack" v-show="isShowBack"></go-back>
    <toast message="加入购物车成功" :is-show="isShowToast"></toast>
  </div>
</template>

<script>
  import DetailNav from "./childComps/DetailNav"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'

  import Toast from 'components/common/toast/Toast'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import GoBack from 'components/content/goBack/GoBack'

  import {debounce} from "common/utils";

  import Scroll from 'components/common/scroll/BScroll'

  import {getDetailData,Goods,GoodsParam,Shop,getRecommend} from "network/detail"
  export default {
    name: "Detail",
    data(){
      return {
        id: null,
        swiperImg:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        topsY:[],
        isShowBack: false,
        isShowToast:false,
      }
    },
    methods:{
      goodsInfoLoad(){
        this.$refs.detailScroll.refresh();
        this.getTopsY();
      },
      titleClick(index){
        this.$refs.detailScroll.goBack(0,-this.topsY[index]+44,200);
      },
      getTopsY(){
        this.topsY.push(0);
        this.topsY.push(this.$refs.param.$el.offsetTop);
        this.topsY.push(this.$refs.comment.$el.offsetTop);
        this.topsY.push(this.$refs.recommend.$el.offsetTop);
        this.topsY.push(Number.MAX_VALUE);
      },
      scroll(position){
        let y = -position.y;
        for (let i = 0 ;i < this.topsY.length;i++){
          if((y>=this.topsY[i]&&y<=this.topsY[i+1])&&this.currentIndex !== i){
            this.$refs.nav.currentIndex = i;
          }
        };
        // 监听返回顶部
        this.isShowBack = Math.abs(position.y) > 1000;
      },
      goBack(){
        this.$refs.detailScroll.goBack(0,0);
      },
      addToCart(){
        const product = {};
        product.title = this.goods.title;
        product.imgURL = this.swiperImg[0];
        product.desc = this.goods.desc;
        product.nowPrice = this.goods.nowPrice;
        product.id = this.id;
        this.$store.commit('addCartGoods',product)

        this.isShowToast = true;
        setTimeout(() => {
          this.isShowToast = false;
        },1500);
      }
    },
    created(){
      this.id = this.$route.query.id;
      getDetailData(this.id).then(res => {
        // 获取顶部轮播图的信息
        this.swiperImg = res.data.result.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(res.data.result.itemInfo, res.data.result.columns, res.data.result.shopInfo.services);
        // 获取店铺信息
        this.shop = new Shop(res.data.result.shopInfo);
        // 获取商品信息
        this.detailInfo =  res.data.result.detailInfo;
        // 保存参数信息
        this.paramInfo = new GoodsParam(res.data.result.itemParams.info, res.data.result.itemParams.rule);
        // 保存评论信息
        if (res.data.result.rate.list) {
          this.commentInfo = res.data.result.rate.list[0];
        }
      });
      // 获取推荐列表
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.data.list;
      })
    },
    mounted(){
      const refresh = debounce(this.$refs.detailScroll.refresh,100);
      this.$bus.$on('itemImgLoad',()=>{
        // 每当一张图片加载完成后就让better-scroll重新计算一下可滚动的区域
        refresh();
      })
    },
    components:{
      DetailNav,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      GoBack,
      Toast,

      Scroll
    }
  }
</script>

<style scoped>
  #detail {
    background-color: #fff;
    position: relative;
    z-index: 1000;
    height: 100vh
  }
  .detail-scroll {
    height: calc(100% - 44px);
  }
  .detail-nav {
    background-color: #fff;
    position: relative;
    z-index: 1001;
  }
</style>
