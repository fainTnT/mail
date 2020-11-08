<template>
  <div class="goods-list-item" @click="goodsClick">
    <img v-lazy="showImg" alt="" @load="imgLoad" >
    <div class="goods-info">
      <p class="goods-title">{{goodsItem.title}}</p>
      <span class="goods-price">￥{{goodsItem.price}}</span>
      <span class="goods-cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imgLoad(){
        // 每当一张图片加载完成后就让better-scroll重新计算一下可滚动的区域
        // 向事件总线发送方法
        this.$bus.$emit('itemImgLoad');
      },
      goodsClick(){
        this.$router.push({
          path:'/detail',
          query:{
            id:this.goodsItem.iid
          }
        });
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    width:48%;
    position: relative;
    padding-bottom:40px;
    font-size:14px;
  }
  .goods-list-item img {
    border-radius: 5%;
    width:100%;
  }
  .goods-info {
    width:100%;
    position: absolute;
    bottom:5px;
    text-align: center;
  }
  .goods-title {
    width:100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span {
    margin-right:20px;
  }
  .goods-price {
    color:var(--color-high-text);
  }
  .goods-cfav {
    position: relative;
  }
  .goods-cfav:after {
    content:'';
    width:15px;
    height:15px;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
    position: absolute;
    left:-15px;
    top:0;
  }

</style>
