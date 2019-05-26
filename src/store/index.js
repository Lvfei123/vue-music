import Vue from 'vue'
import Vuex from 'vuex'
import play from './play.js'
import api from './api.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    playing:false,
  },
  modules: {
    api,
    play
  }
})
  