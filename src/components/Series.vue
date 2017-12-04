<template>
  <div class="series-view" :style="series.backdrop_path ? 'background-image: url(' + series.backdrop_path + ')' : ''">
    <v-container fluid>
      <div  v-if="!loading">
        <h3>{{series.title}}</h3>
        <section>
          <p>{{ series.overview }}</p>
        </section>
        <div class="season-overview">
          <router-link :to="generateLinkToSeason(season)" class="season-item ma-3" v-for="season in series.seasons" v-bind:key="season.season_number">
            <img :src="season.poster_path" alt="">
            <span class="title">Season {{ season.number }}</span>
          </router-link>
        </div>
      </div >
      <v-layout justify-center align-center v-if="loading">
        <v-progress-circular indeterminate color="red"></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { KinohubClient } from "../services/kinohub";

export default {
  name: "Series",
  data: () => ({
    loading: true,
    series: {
      backdrop_path: null
    }
  }),
  methods: {
    generateLinkToSeason(season) {
      return `/series/${this.series.uid}/seasons/${season.number}`;
    }
  },
  created: function() {
    this.loading = true;

    let kinohub = new KinohubClient(this.$store.state.remotes.kinohub);
    kinohub
      .getSerial(this.$route.params.id)
      .then(d => {
        this.series = d;
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.$store.commit("msg/set", { message: err.message });
      });
  }
};
</script>

<style scoped>
.season-overview {
  flex: 1;
  flex-wrap: wrap;
}

.series-view {
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #5d5d5d;
  background-blend-mode: multiply;
}

.season-item {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  width: 130px;
  max-width: 130px;
}

.season-item .title {
  display: block;
}

.season-item img {
  width: 80px;
  height: 120px;
}
</style>
