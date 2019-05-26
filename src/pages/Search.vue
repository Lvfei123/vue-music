<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="单曲" name="first" >
            <el-table :data="searchRes.song.itemlist" style="width: 100%" stripe>
                <el-table-column prop="name" label="歌曲"></el-table-column>
                <el-table-column prop="singer" label="歌手"  width="300px"></el-table-column>
                <el-table-column fixed="right" width="100px">
                    <template slot-scope="scope">
                        <el-button type="success" @click="play(scope.row)"><i class="el-icon-caret-right"></i>播放</el-button>
                    </template>
                </el-table-column> 
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="second">
            <el-table :data="searchRes.album.itemlist" style="width: 100%" stripe>
                <el-table-column prop="name" label="专辑">
                    <template slot-scope="scope">
                        <div class="album">
                            <img :src="scope.row.pic" alt="">
                            <span>{{scope.row.name}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="singer" label="歌手" width="300px"></el-table-column>
                <el-table-column fixed="right" width="100px">
                    <template slot-scope="scope">
                        <el-button type="success" @click="album(scope.row.mid)"><i class="el-icon-caret-right"></i>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane> 
        <el-tab-pane label="歌手" name="third">
            <el-table :data="searchRes.singer.itemlist" style="width: 100%" stripe>
                <el-table-column prop="name" label="专辑">
                    <template slot-scope="scope">
                        <div class="album">
                            <img :src="scope.row.pic" alt="">
                            <span>{{scope.row.name}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="100px">
                    <template slot-scope="scope">
                        <el-button type="success" @click="singer(scope.row.mid)"><i class="el-icon-caret-right"></i>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="MV" name="fourth">
            <el-table :data="searchRes.mv.itemlist" style="width: 100%" stripe>
                <el-table-column prop="name" label="MV"></el-table-column>
                <el-table-column prop="singer" label="歌手" width="300px"></el-table-column>
                <el-table-column fixed="right" width="100px">
                    <template slot-scope="scope">
                        <el-button type="success" @click="mv(scope.row.vid)"><i class="el-icon-caret-right"></i>播放</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            searchRes:{
                song:{itemlist:[]},
                album:{itemlist:[]},
                mv:{itemlist:[]},
                singer:{itemlist:[]},
            },
            activeName:'first'
        }
    },
    watch:{
        $route: {
            handler: function(value){
                const keyword = value.params.keyword
                this.$store.dispatch('search', keyword).then((response) => {
                    response.data.data.song.itemlist.forEach(song => {
                        song.songmid = song.mid
                        song.songid = song.id
                        song.songname = song.name
                    })
                    this.searchRes = response.data.data
                })
            },
            deep: true,
            immediate: true
        }
    },
    methods:{
        ...mapMutations(['play']),
        album(mid){
            this.$router.push('/songlist/album/'+mid)
        },
        singer(mid){
            this.$router.push('/songlist/singer/'+mid)
        },
        mv(vid){
            window.open("https://y.qq.com/portal/mv/v/" + vid + ".html")
        }
    }
}
</script>
<style scoped>
    .album {
        display: flex;
        align-items: center;
    }
    .album>img {
        margin-right: 20px;
    }
</style>