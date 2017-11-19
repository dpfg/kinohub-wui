
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    count: 0,
    remotes: {
      omx: "192.168.100.35:8080",
      kinohub: "192.168.100.34:8081"
    },
    quality: "MQ"
  },
  mutations: {
    setOMX(state, address) {
      state.remotes.omx = address
    },
    setKinoHub(state, address) {
      state.remotes.kinohub = address
    },
    setQuality(state, q) {
      state.quality = q
    },
    increment(state) {
      state.count++
    }
  }
})
