
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { KinohubClient } from '../services/kinohub'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    count: 0,
    remotes: {
      omx: "192.168.100.35:8080",
      kinohub: "192.168.100.34:8081"
    },
    quality: "MQ",
    search: {
      inProgress: false,
      query: "",
      result: []
    },
    errorMsg: null
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
    },
    updateSearchQuery(state, query) {
      state.search.query = query
    },
    startSearch(state, query) {
      this.commit('updateSearchQuery', query)
      state.search.inProgress = true
    },
    completeSearch(state, res) {
      state.search.result = res
      state.search.inProgress = false
    },
    setError(state, errMsg) {
      state.errorMsg = errMsg
    }
  },
  actions: {

    search({ commit, state }, query) {

      commit('startSearch', query)

      new KinohubClient(state.remotes.kinohub)
        .search(query)
        .then(r => commit("completeSearch", r))
        .catch(e => {
          commit("completeSearch", [])
          commit("setError", e)
        })
    },
  }
})
