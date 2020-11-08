<template>
  <div class="goods-list">
    <goods-list-item :goods-item="item" v-for="item in goods"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type: Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

</style>
