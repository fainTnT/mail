<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in cbanners" :key="item.background">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper';
    export default {
        name: "HomeSwiper",
        props: {
            cbanners:{
                type:Array,
                default() {
                    return []
                }
            },

        },
      data(){
        return {
          isLoad: true
        }
      },
      methods:{
        imgLoad(){
          if(this.isLoad){
            this.$emit('swiperImgLoad')
          };
          this.isLoad = false;
        }
      },
        components:{
            Swiper,SwiperItem
        }
    }
</script>

<style scoped>


</style>
