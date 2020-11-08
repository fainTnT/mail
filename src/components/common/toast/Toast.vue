<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      message:{
        type:String,
        default(){
          return '';
        }
      },
      isShow:{
        type:Boolean,
        default(){
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .toast {
    color: #fff;
    border-radius: 8px;
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:10px 20px;
    background-color: rgba(0,0,0,.6);
    animation: hide ease .5s;
  }
  @keyframes hide {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1
    }
  }
</style>
