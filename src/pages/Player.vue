<template>
    <div>
        <img src="../assets/music.jpg" 

        alt="" :class="{'song-img':true,'img-stop':!playing}">
        <div class="lyric">
            <p class="lyric-item" v-for="(item, index) in currentLyric" :key="index">{{item}}</p>
        </div>
        <div class="progress">
            <el-progress :percentage="progress"></el-progress>
        </div>
        <div class="bottom">
            <img src="../assets/loop.png" alt="" @click='updateModel(2)' class="model" v-show="model==1">
            <img src="../assets/loop-one.svg" alt="" @click='updateModel(3)' class="model" v-show="model==2">
            <img src="../assets/random.png" alt="" @click='updateModel(1)' class="model" v-show="model==3">
            <img src="../assets/prev.png" alt="" class="prev" @click="playPrev()">
            <img src="../assets/play.png" v-show="!playing" alt=""  @click="play(song)"  class='play'>
            <img src="../assets/stop.png" v-show="playing" alt="" @click='pause' class="stop">
            <img src="../assets/next.png" alt="" class="next" @click="playNext()">
            <router-link to='/playinglist'>
                <img src="../assets/more.png" alt="" class="more">
            </router-link>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import Base64 from '../assets/base64'
export default {
    data(){
        return {
            lyric:{},
        }
    },
    computed: {
        ...mapState({
            playing : state => state.play.playing,
            currentTime : state => state.play.currentTime,
            duration : state => state.play.duration,
            song : state => state.play.song,
            model : state => state.play.model
        }),
        lyricTimes(){
            return Object.keys(this.lyric).sort((a,b)=>a-b)
        },
        currentLyric(){
            if(this.lyricTimes.length==0) return []
            var currentLyric = []
            const time = this.lyricTimes.find(time => this.currentTime<time.substr(1,4))
            const index = this.lyricTimes.indexOf(time)
            for(var i=index-2;i<=index+2;i++){
                var lyric = this.lyric[this.lyricTimes[i]]
                if(i>=0){
                    currentLyric.push(lyric!=" "?lyric:' - 伴奏 -')
                }else {
                    currentLyric.push(' - 伴奏 - ')
                }
            }
            return currentLyric
        },
        progress(){
            var currentTime = this.currentTime==0?'0:00':this.currentTime
            var duration = this.duration==0?'1:00':this.duration
            var progress = Math.floor((currentTime.substr(0,1)*60+currentTime.substr(2,3)*1)/(duration.substr(0,1)*60+duration.substr(2,3)*1)*100)
            return progress
        }
    },
    methods: {
        ...mapMutations(['play', 'pause', 'playPrev', 'playNext','updateModel'])
    },
    watch:{
        song:{
            immediate:true,
            handler(value){
                if (value == null) return
                const id =value.songid
                this.$store.dispatch('getLyric', id)
                .then((responce) => {
                    const lyric = Base64
                    .decode(responce.data.lyric)
                    .split('[')
                    .slice(5)
                    .map(str => {
                        let t = str.split(']')
                        return {[t[0]]: t[1]}
                    })
                    .reduce((a, b) => {
                        return {...a, ...b}
                    })
                    delete lyric.offset
                    delete lyric['offset:0']
                    this.lyric = lyric
                })
            }
        }
    }
}
</script>
<style scoped>
    .song-img {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        border: 10px solid #bbb;
        transform: rotate(0);
        transition: transform .3s;
        animation: rotate 3s linear infinite;
        width: 300px;
        height: 300px;
    }
    @keyframes rotate {
        from {
            transform: rotate(0)
        }
        to {
            transform: rotate(360deg)
        }
    }
    .img-stop {
        animation-play-state:paused;
    }
    .progress {
        width: 70%;
        margin: 10px auto;
    }
    .bottom {
        width: 60%;
        display: flex;
        justify-content: space-around;
        margin: 0 auto;
        align-items: center;
    }
    .prev, .next, .model, .more {
        width: 40px;
    }
    .play ,.stop {
        width: 50px;
    }
    .lyric {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 270px;
        margin: 100px 0;
    }
    .lyric-item {
        font-size: 20px;
        color: #4D4D4D;
        margin: 10px 0;
    }
    .lyric-item:nth-child(2) {
        font-size: 30px;
        color: #000;
        margin: 20px 0;
        
    }
</style>