<template>
  <div class="series-view" :style="'background-image: url(http://image.tmdb.org/t/p/original' + series.backdrop_path + ')'">
    <v-container fluid>
      <v-layout row wrap  >
        <h3>{{series.name}}</h3>
        <section>
          {{ series.overview }}
        </section>
        <div class="season-overview">
          <div class="season-item ma-3" v-for="season in series.seasons" v-bind:key="season.season_number">
            <img :src="'http://image.tmdb.org/t/p/original' + season.poster_path" alt="">
            <span class="title">Season {{ season.season_number + 1 }}</span>
          </div>
        </div>
      </v-layout >
    </v-container>
  </div>
</template>
<script>
import mock from "../mocks/series.json";

export default {
  name: "Series",
  data: () => ({
    series: mock
  })
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
