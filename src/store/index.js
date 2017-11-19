
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    count: 0,
    remotes: [
      {
        type: "OMX",
        address: "192.168.100.35"
      },
      {
        type: "KINOHUB",
        address: "192.168.100.34"
      }
    ]
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
