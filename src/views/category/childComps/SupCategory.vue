<template>
  <div class="sup-category">
    <div class="sup-category-list" v-for="item in subList">
      <img :src="item.image" alt="">
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SupCategory",
    props:{
      subList:{
        type:Array,
        default(){
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .sup-category{
    height: calc(100vh - 90px);
    width:75%;
    float: left;
    display: flex;
    flex-wrap: wrap;
    align-content:flex-start;
    padding-top:10px;
    overflow: auto;
  }
  .sup-category .sup-category-list {
    width:33.3%;
    height:100px;
    text-align: center;
    font-size: 14px;
  }
  .sup-category .sup-category-list img {
    width:70px;
    height:70px;
  }
</style>
