<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <category-list :category-list="categoryList" @categoryListClick="categoryListClick"></category-list>
    <sup-category :sub-list="subCategoryList"></sup-category>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CategoryList from './childComps/CategoryList'
  import SupCategory from './childComps/SupCategory'
  import {getCategoryData,getSubcategory} from 'network/category'
  import {debounce} from "common/utils";
  export default {
    name: "Category",
    data(){
      return {
        categoryList: [],
        subCategoryList:[],
      }
    },
    components:{
      NavBar,
      CategoryList,
      SupCategory,
    },
    mounted(){
      // 获取分类列表信息
      getCategoryData().then((res)=>{
        this.categoryList = res.data.data.category.list;
        getSubcategory(this.categoryList[0].maitKey).then((res)=>{
          this.subCategoryList = res.data.data.list;
        });
      });
    },
    methods:{
      categoryListClick(maitKey){
        getSubcategory(maitKey).then((res)=>{
          this.subCategoryList = res.data.data.list;
        });
      }
    }
  }
</script>

<style scoped>
  #category {
    height:100vh;
    position: relative;
    overflow: hidden;
  }
  .category-nav {
    background-color:var(--color-high-text);
    font-size: 20px;
    font-weight: bold;
    letter-spacing:5px;
    color: #eee;
    margin-bottom:3px;
  }
</style>
