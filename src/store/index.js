import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewMode: 'cursor-content-grid'
  },
  getters: {
  },
  mutations: {
    changeMode (value, mode) {
      value.viewMode = mode.viewMode
    }
  },
  actions: {
  },
  modules: {
  }
})
