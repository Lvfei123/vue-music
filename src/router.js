import Vue from 'vue'
import Router from 'vue-router'
const Homepage = ()=>import ('@/pages/Homepage')
const PlayingList = ()=>import ('@/pages/PlayingList')
const Player = ()=>import ('@/pages/Player')
const Search = ()=>import ('@/pages/Search')
const SongList = ()=>import ('@/pages/SongList')
Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {path: '/',redirect: '/homepage'},
    {path: '/homepage',component: Homepage},
    {path: '/playinglist',component: PlayingList},
    {path: '/player',component: Player},
    {path: '/search/:keyword',component: Search},
    {path: '/songlist/:kind/:id',component: SongList}
  ]
})
export default router
