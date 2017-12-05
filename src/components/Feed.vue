<template>
  <v-container fluid>
    <v-layout wrap v-if="!loading">
      <v-flex xs12 sm6 md4 mb-3 d-flex v-for="(release, index) in feedData" v-bind:key="index">
        <v-card class="episode">
          <v-card-media :src="release.episode.still_path" height="200px" class="grey darken-4">
            <div class="watched-cover" v-if="release.watched">
              <span class="text">watched</span>
            </div>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="title mb-0">{{ getReleaseTitle(release) }}</h3>
              <span class="subheading white--text">{{release.show.title}}</span><br>
              <span class="grey--text">{{ new Date(release.episode.first_aired).toLocaleString()}}</span><br>
            </div>
          </v-card-title>
          <v-card-actions v-if="release.content_available">
            <v-btn flat color="red" @click="play(release)">Play</v-btn>
            <v-btn flat color="grey lighten-1">Mark As Watched</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center v-if="loading">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script>
import { KinohubClient } from "../services/kinohub";
import { playEpisode } from "../services/player";

export default {
  name: "Feed",
  created: function() {
    this.loading = true;

    let kinohub = new KinohubClient(this.$store.state.remotes.kinohub);
    kinohub.getLastAiredEpisodes(7).then(d => {
      this.feedData = d;
      this.loading = false;
    });
  },
  data: () => ({
    loading: true,
    feedData: null
  }),
  methods: {
    getReleaseTitle(release) {
      let episode = release.episode;
      return `S${episode.season}E${episode.number} ${episode.title}`;
    },

    play(release) {
      let kinohub = new KinohubClient(this.$store.state.remotes.kinohub);
      Promise.all([
        kinohub.getSerial(release.show.uid),
        kinohub.getSeason(release.show.uid, release.episode.season)
      ]).then(([serial, season]) => {
        let episode = season.episodes.find(
          e => e.number === release.episode.number
        );

        playEpisode(this.$store, {
          serial,
          season,
          episode
        });
      });
    }
  }
};
</script>

<style scoped>
.episode {
  margin-right: 10px;
}
.watched-cover {
  width: 100%;
  height: 100%;
  background-color: #0000008a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.watched-cover .text {
  font-size: 32px;
  text-transform: uppercase;
  color: #f1f1f19e;
}
</style>
