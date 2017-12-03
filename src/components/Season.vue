<template>
  <v-container fluid>
    <v-layout wrap v-if="!loading">
      <v-flex xs12 sm6 md4 mb-3 d-flex v-for="episode in season.episodes" v-bind:key="episode.episode_number">
        <v-card class="episode">
          <v-card-media :src="episode.still_path" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">S1E{{episode.episode_number}} {{ episode.name }}</h3>
              <span class="grey--text">{{ episode.air_date }}</span><br>
              <div class="overview">{{ episode.overview }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="red" v-if="episode.files">Play Now</v-btn>
            <v-btn flat color="grey lighten-1">Add to queue</v-btn>
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

export default {
  name: "Season",
  created: function() {
    this.loading = true;

    if (!this.$store.state.remotes) {
      // show err?
      return;
    }

    let kinohub = new KinohubClient(this.$store.state.remotes.kinohub);
    let routeParams = this.$route.params;
    kinohub
      .getSeason(routeParams.id, routeParams.num)
      .then(d => {
        this.season = d;
        this.loading = false;
      })
      .catch(err => {
        // ??
        this.loading = false;
      });
  },
  data: () => ({
    loading: true,
    season: null
  })
};
</script>

<style>
.episode {
  /* width: 300px; */
  margin-right: 10px;
}

.overview {
  max-height: 60px;
  overflow: scroll;
}
</style>

