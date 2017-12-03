
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { KinohubClient } from '../services/kinohub'
import { OmxClient } from '../services/omx'

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
    status: {
      running: false,
      entry: null,
      playlist: null
    },
    errorMsg: null
  },

  getters: {
    statusCover: state => {
      let status = state.status
      if (!status.running) {
        return require("../assets/cover.png")
      }

      let mi = status.entry.media_info
      if (mi.type === 'SERIAL') {
        return mi.serial.poster_path
      }

      return require("../assets/cover.png")
    },

    statusTitle: state => {
      let status = state.status
      if (!status.running) {
        return ""
      }

      let mi = status.entry.media_info
      if (mi.type === 'SERIAL') {
        return mi.serial.title
      }

      return ""
    },

    statusSubTitle: state => {
      let status = state.status
      if (!status.running) {
        return ""
      }

      let mi = status.entry.media_info
      if (mi.type === 'SERIAL') {
        return `S${mi.season.number}E${mi.episode.number} ${mi.episode.title}`
        return mi.serial.title
      }

      return ""
    },

    statusLink: state => {
      let status = state.status
      if (!status.running) {
        return null
      }

      let mi = status.entry.media_info
      if (mi.type === 'SERIAL') {
        return `/series/${mi.serial.uid}/seasons/${mi.season.number}`
      }

      return null
    }
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
    },
    setStatus(state, status) {
      state.status = status
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

    updateStatus({ commit, state }) {
      new OmxClient(state.remotes.omx)
        .status()
        .then(s => commit('setStatus', s))
        .catch(e => commit('setError', e))
    },
  }
})
