<template>
    <el-table :data="playList" stripe>
        <el-table-column prop="songname" label="歌曲"></el-table-column>
        <el-table-column prop="singer" label="歌手"  width="300px"></el-table-column>
        <el-table-column fixed="right" width="100px">
            <template slot-scope="scope">
                <el-button type="success" @click="play(scope.row)"><i class="el-icon-caret-right"></i>播放</el-button>
            </template>
        </el-table-column> 
    </el-table>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return {
           
        }
    },
    computed:{
        ...mapState({playList: state => state.play.playList})
    },
    methods:{
        ...mapMutations(['play'])
    }
}
</script>
<style scoped>
    .el-icon-delete, .el-icon-service {
        font-size: 20px;
        margin-right: 10px
    }
</style>