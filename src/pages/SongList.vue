<template>
    <div>
        <div class="top">
            <img :src="pic" alt="">
            <div class="info">
                <p class="name">{{name}}</p>
                <p>歌曲数量：{{songNumber}}</p>
                <p class="playnum">{{number}}</p>
                <el-button type="success" @click="setPlayList(songList)">
                    <i class="el-icon-caret-right"></i>播放全部
                </el-button>
            </div>
        </div>
        <el-table :data="songList"  stripe>
            <el-table-column prop="songname" label="歌曲" width="300px"></el-table-column>
            <el-table-column prop="singer" label="歌手"></el-table-column>
            <el-table-column prop="interval" label="播放量"></el-table-column>
            <el-table-column fixed="right">
                <template slot-scope="scope">
                    <el-button type="success" @click="play(scope.row)"><i class="el-icon-caret-right"></i>播放</el-button>
                </template>
            </el-table-column> 
        </el-table>
        <div class="brief-container">
            <p>简介</p>
            <p v-html="brief" class="brief"></p>
        </div> 
    </div>
</template>
<script>
import {mapMutations,} from 'vuex'
export default {
     data(){
        return {
            name:'',
            number:'',
            brief:'',
            pic:'',
            songList:[],
            songNumber:0,
            singer:{}
        }
    },
    methods:{
        ...mapMutations(['play','setPlayList']),
    },
    created(){
        const kind = this.$route.params.kind
        const id = this.$route.params.id
        switch(kind) {
            case 'rank':
                this.$store.dispatch('getRankSongs',id).then((response) => {
                    this.name = response.data.topinfo.ListName
                    this.number = '播放量 ： '+parseInt(response.data.topinfo.listennum/10000)+'万'
                    this.songNumber = response.data.total_song_num
                    this.brief = response.data.topinfo.info
                    this.pic = response.data.topinfo.pic
                    response.data.songlist.forEach(song => {
                        var {songname,albumname,interval,songid,songmid} = song.data
                        var obj = {songname,albumname,interval,songid,songmid}
                        obj.singer = ''
                        song.data.singer.forEach(singer => {
                            obj.singer += singer.name
                        })
                        obj.number = song.cur_count
                        this.songList.push(obj)
                    })
                })
                break;
            case 'album':
                this.$store.dispatch('getAlbum', id).then((response) => {
                    const data = response.data.data
                    this.name = data.name
                    this.songNumber = data.total
                    this.number = `歌手：${data.singername}-----公司：${data.company}`
                    this.pic = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + id + '.jpg?max_age=2592000'
                    this.brief = data.desc
                    data.list.forEach(song => {
                        var {songname,albumname,songid,songmid} = song
                        var obj = {songname,albumname,songid,songmid}
                        obj.singer = ''
                        song.singer.forEach(singer => {
                            obj.singer += singer.name
                        })
                        obj.number = song.interval
                        this.songList.push(obj)
                    })
                })
                break;
            case 'singer':
                this.$store.dispatch('getSingerInfo',id).then((response) => {
                    const data = response.data.data
                    this.songNumber = data.total
                    this.name = data.singer_name
                    this.number = '粉丝数：'+data.fans
                    this.brief = data.SingerDesc
                    this.pic = 'http://y.gtimg.cn/music/photo_new/T001R300x300M000' + id + '.jpg?max_age=2592000'
                    data.list.forEach(song => {
                        song = song.musicData
                        var {songname,albumname,songid,songmid} = song
                        var obj = {songname,albumname,songid,songmid}
                        obj.singer = ''
                        song.singer.forEach(singer => {
                            obj.singer += singer.name
                        })
                        obj.number = song.interval
                        this.songList.push(obj)
                    })

                })
            default:
                
        } 
    }
}
</script>
<style scoped>
    .top {
        display: flex;
    }
    .top img {
        width: 250px;
        height: 250px;
        margin-right: 50px;
    }
    .name {
        font-size: 30px;
    }
    .playnum {
        margin-bottom: 120px;
    }
    .el-icon-caret-right,.el-button {
        font-size: 20px;
    }
    .el-table {
        width: 60%
    }
    .brief-container {
        position: fixed;
        top: 35%;
        right: 10%;
        font-size: 20px;
        width: 270px;
        width: 20%;
        margin: 0 10%;
        vertical-align: top;
    }
    .brief {
        font-size: 14px;
    }
</style>


