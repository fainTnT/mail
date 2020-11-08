<template>
  <div class="cart-list">
    <div id="shop-item" v-for="(item,index) in cartGoods">
      <div class="item-selector">
        <div class="icon-selector" :class="{'selector-active': item.checked}" @click="selectItem(index)">
          <img src="~assets/img/cart/tick.svg" alt="">
        </div>
      </div>
      <div class="item-img">
        <img :src="item.imgURL" alt="商品图片">
      </div>
      <div class="item-info">
        <div class="item-title">{{item.title}}</div>
        <div class="item-desc">商品描述: {{item.desc}}</div>
        <div class="info-bottom">
          <div class="item-price left">¥{{item.nowPrice}}</div>
          <div class="item-count right">x{{item.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartList",
    props:{
      cartGoods:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data: function () {
      return {
        checked: this.value
      }
    },
    methods: {
      selectItem: function (index) {
        this.cartGoods[index].checked = !this.cartGoods[index].checked;
      },
    },
    watch: {
      value: function (newValue) {
        this.checked = newValue;
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
