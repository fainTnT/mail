<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar"><div slot="center">购物车({{cartListLength}})</div></nav-bar>
    <h2 v-show="!cartListLength">购物车里没有商品</h2>
    <scroll class="cart-content">
      <cart-list :cart-goods="cartList"></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import Scroll from 'components/common/scroll/BScroll'
  import BottomBar from './childComps/BottomBar'

  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      BottomBar,
    },
    activated(){

    },
    computed:{
      ...mapGetters([
        'cartList',
        'cartListLength'
      ])
    }
  }
</script>

<style scoped>
  #cart {
    height:100vh;
    position: relative;
  }
  .cart-nav-bar{
    background-color:var(--color-high-text);
    font-size: 20px;
    font-weight: bold;
    letter-spacing:5px;
    color: #eee;
  }
  .cart-content {
    height:calc(100% - 93px);
    overflow: hidden;
  }
</style>
