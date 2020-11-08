<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "BScroll",
    props:{
      probeType:{
        type: Number,
        default(){
          return 0;
        }
      },
      pullUpLoad:{
        type: Boolean,
        default(){
          return true
        }
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      });
      // 监听滚动
      this.scroll.on('scroll',position => {
        this.$emit('contentScroll',position);
      });
      // 监听上拉
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp');
      })
    },
    methods:{
      goBack(x,y,time=500){
        this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.scroll.finishPullUp(); // 完成上拉加载
      },
      refresh(){
        this.scroll.refresh(); // 重新计算滚动高度
      }
    }
  }
</script>

<style scoped>

</style>
