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
            <v-divider v-if="index + 1 < status.playlist.length" :key="index"></v-divider>
          </template>
        </v-list>
    </v-flex>
    <v-dialog v-model="confirm" persistent max-width="390">
      <v-card>
        <v-card-title class="title">Do you want to play selected item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click.native="confirm = false">Cancel</v-btn>
          <v-btn color="red" flat @click.native="confirmed()">Play</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { OmxClient } from "../services/omx";

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
    ],
    confirm: false,
    confirmIndex: -1
  }),
  mounted: function() {
    this.omx = new OmxClient(this.$store.state.remotes.omx);
  },
  computed: {
    ...mapState({
      status: state => state.status
    })
  },
  methods: {
    view(status) {
      const playlist = status.playlist;
      if (!playlist) {
        return [];
      }

      const entries = playlist.entries;

      return entries.map((item, index) => {
        const media_info = item.media_info;

        const serial = media_info.serial;
        const season = media_info.season;
        const episode = media_info.episode;

        return {
          title: `S${season.number}E${episode.number} ${episode.title}`,
          subTitle: serial.title,
          avatar: serial.poster_path,
          current: playlist.current_index === index && status.running
        };
      });
    },
    selectItem(index) {
      this.confirm = true;
      this.confirmIndex = index;
    },
    confirmed() {
      if (this.confirmIndex < 0) {
        return;
      }
      this.omx.playListSelect(this.confirmIndex);
      this.confirm = false;
      this.confirmIndex = -1;
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
