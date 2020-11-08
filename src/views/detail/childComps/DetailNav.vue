<template>
  <div class="DetailNav">
    <nav-bar>
      <div slot="left" class="backImg" @click="imgBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-title">
        <div v-for="(item,index) in titles" class="title" :class="{'active':index === cIndex}" @click="itemClick(index)" :key="index">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
    name: "DetailNav",
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        cIndex: 0
      }
    },
    methods:{
      itemClick(index){
        this.cIndex = index;
        this.$emit('titleClick',index);
      },
      imgBack(){
        this.$router.go(-1);
      }
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .nav-title {
    display: flex;
    font-size: 16px;
  }
  .title {
    flex:1;
  }
  .backImg {
    margin-top:5px;
  }
  .active {
    color: var(--color-high-text)
  }
</style>
