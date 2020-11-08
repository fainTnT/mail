<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" @click="tabClick(index)">
      <span :class="{active:index == currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type: Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods:{
      tabClick(index){
        this.currentIndex = index;
        this.$emit('item-click',index);
      },

    },
  }
</script>

<style scoped>
  .tab-control{
    width:100%;
    display: flex;
    background-color: #fff;
    height:40px;
    line-height: 40px;
    text-align: center;
  }
  .tab-control  .tab-control-item {
    flex: 1;
  }
  .tab-control  .tab-control-item span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
  }

</style>
