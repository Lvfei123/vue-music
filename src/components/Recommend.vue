<template>
    <div>
        <Swiper :imgs='imgs'></Swiper>
        <el-row :gutter="10">
            <el-col :span='6' v-for="(song, index) in songList" :key="index">
                <div @click="$router.push('/songlist/cd/'+song.dissid)">
                    <img :src="song.imgurl" alt="">
                    <p class="ellipsis">
                        {{song.dissname}}
                    </p>
                    <p class="ellipsis">
                        {{song.author}}
                    </p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Swiper from '@/components/Swiper'
export default {
    components:{
        Swiper
    },
    data(){
        return {
            imgs:[],
            songList:[]
        }
    },
    created: function () {
        this.$store.dispatch('getRecommands').then((response) => {
            this.imgs = response.data.data.focus
            this.songList = response.data.data.hotdiss.list
        }, (error) => {
            alert('请求失败！'+error)
        })
    },
    methods:{
        
    }
}
</script>
<style scoped>
    .el-col img{
        width: 100%;
    }
</style>