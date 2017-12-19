<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-list two-line>
          <template v-for="(item, index) in view(status)">
            <v-list-tile
              avatar

              :key="index"
            >
              <v-list-tile-action>
                <v-icon color="grey lighten-1" v-if="item.current">play_arrow</v-icon>
              </v-list-tile-action>
              <v-list-tile-avatar>
                <img class="poster" v-bind:src="item.avatar"/>
              </v-list-tile-avatar>
              <v-list-tile-content @click="selectItem(index)">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subTitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <!-- <v-list-tile-action-text>{{ 3 }}</v-list-tile-action-text> -->
                <!-- <v-icon
                  color="grey lighten-1"
                  v-if="selected.indexOf(index) < 0"
                >star_border</v-icon> -->
                <v-menu offset-y>
                  <v-icon color="grey lighten-1" slot="activator">more_vert</v-icon>
                  <v-list>
                    <v-list-tile v-for="item in itemMenu" :key="item.label" @click="alert(2)">
                      <v-list-tile-action>
                        <v-icon color="grey lighten-1">{{ item.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-title>{{ item.label }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < playlist.length" :key="index"></v-divider>
          </template>
        </v-list>

    </v-flex>
  </v-layout>
  <!-- <div>
    <h3>Play list</h3>
    <ul>
      <li v-for="(item, index) in playlist" v-bind:key="index">{{ item }}</li>
    </ul>
  </div> -->
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "PlayList",
  data: () => ({
    itemMenu: [
      {
        icon: "delete",
        label: "Delete"
      },
      {
        icon: "open_in_new",
        label: "Open"
      }
    ]
  }),
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapGetters(["playlist"])
  },
  methods: {
    view(status) {
      const playlist = status.playlist;
      if (!playlist || !status.entry) {
        return [];
      }

      const entries = playlist.entries;

      return entries.map(item => {
        const media_info = item.media_info;

        const serial = media_info.serial;
        const season = media_info.season;
        const episode = media_info.episode;

        return {
          title: `S${season.number}E${episode.number} ${episode.title}`,
          subTitle: serial.title,
          avatar: serial.poster_path,
          current: status.entry.media_info.episode.uid === episode.uid
        };
      });
    },
    selectItem(index) {
      alert(index);
    }
  }
};
</script>

<style scoped>
.list__tile--avatar .avatar .poster {
  height: auto;
  border-radius: 0px;
}
</style>
