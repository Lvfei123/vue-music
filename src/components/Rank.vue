<template>
    
        <el-row :gutter="20">
            <el-col  v-for="(rank, index) in topList" :key="index" :span="8" >
                <router-link  class="rank" :to="`/songlist/rank/${rank.id}`">
                    <img :src="rank.picUrl" alt="" class="rank-img">
                    <div class="rank-info ellipsis">
                        <p class="rank-name">{{rank.topTitle}}</p>
                        <p class="song ellipsis" v-for="(song, index) in rank.songList" :key="index">
                            {{index+1+' '}}{{song.songname}}<span>-{{song.singername}}</span>
                        </p>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    
    
</template>
<script>
export default {
    data(){
        return{
            topList: null
        }
    },
    created: function () {
      this.$store.dispatch('getRankList').then((response) => {
        this.topList = response.data.data.topList
      })
    }
}
</script>
<style scoped>
    .rank {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        box-shadow: 0 0 10px #DDD;
        border-radius: 5px;
        margin: 15px 0;
    }
    .rank-img {
        width: 150px;
        height: 150px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        flex-shrink: 0;
    }
    .song {
        font-size: 14px
    }
    .rank-info p {
        margin: 10px;
    }
</style>