<template>
  <v-app
    dark
    id="inspire"
  >
    <v-navigation-drawer
      persistent
      clipped
      enable-resize-watcher
      v-model="drawer"
      app
      width="240"
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="navigateToMenuItem(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showSettings()">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Settings</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="red" dense fixed clipped-left app>
      <v-toolbar-title class="ml-0 pl-3 app-toolbar-title" >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="ml-3">fa-youtube</v-icon>
      </v-toolbar-title>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          class="white--text"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <main>
      <v-content>
            <router-view></router-view>
            <pref-dialog :open="settingsVisible" v-on:close="hideSettings"></pref-dialog>
            <v-snackbar v-model="snackbar">Started casting to the TV<v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn></v-snackbar>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import PrefDialog from "@/components/PrefDialog.vue";

export default {
  data: () => ({
    drawer: true,
    items: [
      { icon: "subscriptions", text: "Subscriptions", path: "/" },
      { icon: "airplay", text: "Player", path: "/player" },
      { icon: "featured_play_list", text: "Playlists", path: "/" },
      { icon: "search", text: "Search", path: "/search" }
    ],
    settingsVisible: false,
    snackbar: true
  }),
  methods: {
    navigateToMenuItem: function(item) {
      this.$router.push({ path: item.path });
    },
    showSettings: function() {
      this.$data.settingsVisible = true;
    },
    hideSettings: function() {
      this.$data.settingsVisible = false;
    }
  },
  components: {
    PrefDialog
  }
};
</script>

<style>
.input-group__details:after {
  background-color: rgba(255, 255, 255, 0.32) !important;
}
.app-toolbar-title {
  width: 240px;
}

@media screen and (max-width: 600px) {
  .app-toolbar-title {
    width: 80px;
  }
}
</style>
