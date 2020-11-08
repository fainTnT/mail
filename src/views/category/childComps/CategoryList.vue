<template>
  <div class="category-list">
    <scroll class="category-list-scroll">
      <div v-for="(item,index) in categoryList" class="category-item" @click="itemClick(index,item.maitKey)" :class="{active:currentIndex==index}">{{item.title}}</div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/BScroll'
  export default {
    name: "CategoryList",
    components:{
      Scroll,
    },
    data(){
      return {
        currentIndex: 0,
      }
    },
    props:{
      categoryList:{
        type: Array,
        default(){
          return [];
        }
      }
    },
    mounted(){

    },
    methods:{
      itemClick(index,maitKey){
        this.currentIndex = index;
        this.$emit('categoryListClick',maitKey)
      }
    }
  }
</script>

<style scoped>
  .category-list {
    width:25%;
    height: calc(100vh - 90px);
    background-color: #eee;
    float: left;
  }
  .category-list-scroll {
    height:100%;
    overflow: hidden;
  }
  .category-list-scroll .category-item{
    width:100%;
    font-size: 16px;
    text-align: center;
    height:40px;
    line-height: 40px;
  }
  .active {
    background-color: #fff;
    border-left:3px solid var(--color-high-text);
    color:var(--color-high-text);
  }
</style>
