import store from './index'
const player = new QMplayer();
player.on("timeupdate", function () {
    var duration = parseInt(player.duration)
    var currentTime = parseInt(player.currentTime)
    duration = parseInt(duration/60)+':'+('0'+duration%60).slice(-2)
    currentTime =parseInt(currentTime/60)+':'+('0'+currentTime%60).slice(-2)
    store.commit(
        "updateDuration",
        duration
    );
    store.commit(
        "updateCurrentTime",
        currentTime
    );
});
player.on("ended", function () {
    store.commit("playContinue");
});
export default {
    state:{
        currentTime: 0,
        duration: 0,
        playing:false,
        song:null,
        playList: [],
        index:0,
        model:1
    },
    mutations:{
        playContinue(state){
            if(!state.loop){
                const index = state.playList.length>state.index+1? ++state.index : 0
                state.index = index
            }
            switch(state.model) {
                case 1:
                    state.index = state.playList.length>state.index+1? ++state.index : 0
                   break;
                case 2:
                   state.index = state.index
                   break;
                default:
                    state.index = Math.floor(Math.random()*state.playList.length)
           }
            player.play(state.playList[state.index].songmid)
        },
        updateDuration (state, time) {
            state.duration = time
        },  
        updateCurrentTime (state, time) {
            state.currentTime = time
        },
        setPlayList (state, playList) {
            state.playList = playList
            state.song = state.playList[0]
            state.index = 0
            state.playing = true
            player.play(state.song.songmid)
        },
        play(state,song){
            if(!song) return
            state.playing = true
            const music = state.playList.find(item => item.songmid == song.songmid)
            if(!music){
                state.song = song
                state.playList.push(song)
                state.index = state.playList.length-1
            }else {
                state.song = song
                state.index = state.playList.indexOf(music)
            }
            player.play(state.song.songmid)
            
        },
        pause(state){
            state.playing = false
            player.pause()
        },
        playPrev (state) {
            state.index = state.index == 0?  state.playList.length-1 : --state.index
            state.song = state.playList[state.index]
            player.play(state.playList[state.index].songmid);
        },
        playNext (state) {
            state.index = state.playList.length>state.index+1? ++state.index : 0
            state.song = state.playList[state.index]
            player.play(state.playList[state.index].songmid);
        },
        updateModel(state,num){
            state.model = num
        }
    }
}