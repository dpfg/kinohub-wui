<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 sm4 mb-3 d-flex v-for="episode in season.episodes" v-bind:key="episode.episode_number">
        <v-card class="episode">
          <v-card-media :src="'http://image.tmdb.org/t/p/original' + episode.still_path" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">S1E{{episode.episode_number}} {{ episode.name }}</h3>
              <span class="grey--text">{{ episode.air_date }}</span><br>
              <div class="overview">{{ episode.overview }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="red">Play Now</v-btn>
            <v-btn flat color="grey lighten-1">Add to playlist</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import mock from "../mocks/season.json";

export default {
  name: "Season",
  data: () => ({
    season: mock
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

