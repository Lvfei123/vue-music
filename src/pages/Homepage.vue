<template>
    <div>
        <Rank v-show="isRank"></Rank>
        <Recommend v-show="!isRank"></Recommend>
        <i class="el-icon-arrow-left" @click="isRank=!isRank"></i>
        <i class="el-icon-arrow-right" @click="isRank=!isRank"></i>
        
    </div>
</template>
<script>
import Rank from '@/components/Rank.vue'
import Recommend from '@/components/Recommend.vue'
import axios from 'axios'
export default {
    components:{
        Rank,
        Recommend
    },
    data(){
        return {
            isRank:false
        }
    }
}
</script>
<style scoped>
    .el-icon-arrow-left,.el-icon-arrow-right {
        font-size: 50px;
        font-weight: 500;
        position: fixed;
        top: 40%;
    }
    .el-icon-arrow-left {
        left: 20px;
    }
    .el-icon-arrow-right {
        right: 20px;
    }
</style>