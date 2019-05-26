<template>
    <div class="swiper-container" >
        <!-- swiper的包裹层div -->
        <div class="swiper-wrapper">
          <!-- swiper的轮播div -->
            <div class="swiper-slide" v-for="(swipeImg,index) in imgs" :key="index">
                <router-link :to="'/songlist/album/'+swipeImg.id">
                    <img :src="swipeImg.pic">
                </router-link>
            </div>
            
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    props:{
        imgs:Array
    },
    watch:{
        imgs:{
            handler(){
                this.$nextTick(() => {
                    new Swiper('.swiper-container', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        autoplay:true
                    })
                })
            }
        }
        
    }
}
</script>
<style scoped>
    .swiper-container {
        width: 100%;
    }
    img {
        width: 100%;
    }
</style>
