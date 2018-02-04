import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { KinohubClient } from "../services/kinohub";
import { OmxClient } from "../services/omx";

Vue.use(Vuex);

const MessageStore = {
  namespaced: true,
  state: {
    show: false,
    message: ""
  },
  getters: {
    show(state) {
      return state.show;
    },
    message(state) {
      return state.message;
    }
  },
  mutations: {
    set(state, data) {
      state.show = true;
      state.message = data.message;
    },
    update(state, data) {
      state.show = !!data.show;
    }
  }
};

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
    }
  },
  modules: {
    msg: MessageStore
  },
  getters: {
    statusCover: state => {
      let status = state.status;
      if (!status.running) {
        return require("../assets/cover.png");
      }

      let mi = status.entry.media_info;
      if (mi.type === "SERIAL") {
        return mi.serial.poster_path;
      }

      return require("../assets/cover.png");
    },

    statusTitle: state => {
      let status = state.status;
      if (!status.running) {
        return "";
      }

      let mi = status.entry.media_info;
      if (mi.type === "SERIAL") {
        return mi.serial.title;
      }

      return "";
    },

    statusSubTitle: state => {
      let status = state.status;
      if (!status.running) {
        return "";
      }

      let mi = status.entry.media_info;
      if (mi.type === "SERIAL") {
        return `S${mi.season.number}E${mi.episode.number} ${mi.episode.title}`;
      }

      return "";
    },

    statusLink: state => {
      let status = state.status;
      if (!status.running) {
        return null;
      }

      let mi = status.entry.media_info;
      if (mi.type === "SERIAL") {
        return `/series/${mi.serial.uid}/seasons/${mi.season.number}`;
      }

      return null;
    },

    playlist: state => {
      return state.status.playlist;
    }
  },

  mutations: {
    setOMX(state, address) {
      state.remotes.omx = address;
    },
    setKinoHub(state, address) {
      state.remotes.kinohub = address;
    },
    setQuality(state, q) {
      state.quality = q;
    },
    increment(state) {
      state.count++;
    },
    updateSearchQuery(state, query) {
      state.search.query = query;
    },
    startSearch(state, query) {
      this.commit("updateSearchQuery", query);
      state.search.inProgress = true;
    },
    completeSearch(state, res) {
      state.search.result = res;
      state.search.inProgress = false;
    },
    setStatus(state, status) {
      state.status = status;
    }
  },

  actions: {
    search({ commit, state }, query) {
      commit("startSearch", query);

      new KinohubClient(state.remotes.kinohub)
        .search(query)
        .then(r => commit("completeSearch", r))
        .catch(e => {
          commit("completeSearch", []);
          commit("msg/set", {
            message: `Unable to complete search: ${e.message}`
          });
        });
    },

    updateStatus({ commit, state }) {
      new OmxClient(state.remotes.omx)
        .status()
        .then(s => commit("setStatus", s))
        .catch(e =>
          commit("msg/set", {
            message: `Unable to get status of OMX: ${e.message}`
          })
        );
    },

    subscribeToStatus({ commit, state }) {
      new OmxClient(state.remotes.omx).subscribe(
        status => {
          commit("setStatus", status);
        },
        e => {
          commit("msg/set", { message: `Unable to get status update` });
        }
      );
    }
  }
});
