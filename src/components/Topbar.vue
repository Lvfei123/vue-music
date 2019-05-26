<template>
        <el-row>
            <el-col :span="4">
                <i class="el-icon-service"></i>
            </el-col>
            <el-col :span="4">
                <router-link to='/homepage'>
                    <span :class="['tab-item',isCurrent('/homepage')?'select':'']">首页</span>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to='/playinglist'>
                    <span :class="['tab-item',isCurrent('/playinglist')?'select':'']">歌单</span>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to='/player'>
                    <span :class="['tab-item',isCurrent('/player')?'select':'']">播放</span>
                </router-link>
            </el-col>
            <el-col :span="8">
                <el-input placeholder="请输入音乐/歌手" class="input" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </el-col>
        </el-row>
</template>
<script>
export default {
    methods:{
        isCurrent(path){
            return path === this.$route.path
        },
        search(){
            this.$router.push(`/search/${this.keyword}`)
        }
    },
    data(){
        return {
            keyword:''
        }
    }
}
</script>
<style scoped>
    .el-row {
        margin-bottom: 10px;
        position: fixed;
        top: 0;
        left: 50%;
        z-index: 100;
        background: #fff;
        width: 70%;
        transform: translateX(-50%);
    }
    .el-icon-service {
        font-size: 60px;
        font-weight: 500;
    }
    .tab-item{
        display: block;
        text-align: center;
        height: 25px;
        width: 45px;
        letter-spacing: 4px;
        margin: 15px 0;
        color: #666;
    }
    .input {
        margin: 8px 0;
    }
    .select {
        border-bottom: 3px solid #999;
        transition: all .1s;
    } 
</style>