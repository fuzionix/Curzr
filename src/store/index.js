import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewMode: 'cursor-content-grid',
    modelName: ''
  },
  getters: {
  },
  mutations: {
    changeMode (state, mode) {
      state.viewMode = mode.viewMode
    },
    changeModelName (state, model) {
      state.modelName = model
    }
  },
  actions: {
  },
  modules: {
  }
})
