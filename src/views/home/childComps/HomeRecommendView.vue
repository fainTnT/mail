<template>
  <div class="recommend">
    <div v-for="item in crecommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props:{
      crecommends:{
        type: Array,
        default(){
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
    font-size: 14px;
  }
  .recommend .recommend-item {
    flex: 1;
    width:25%;
    margin: 0 5px;
  }
  .recommend .recommend-item img{
    width: 100%;
  }
</style>
