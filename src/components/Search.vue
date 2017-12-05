<template>
  <v-container fluid>
    <v-layout row wrap v-if="!loading">
      <v-flex row wrap v-for="item in result"  v-bind:key="item.uid">
        <router-link v-bind:to="generateLink(item)" class="poster elevation-2" >
          <img v-bind:src="item.poster_path"></v-card-media>
        </router-link>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center v-if="loading">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SearchResult",
  computed: {
    ...mapState({
      loading: state => state.search.inProgress,
      result: state => state.search.result
    })
  },
  methods: {
    generateLink(item) {
      if (item.type === "SERIAL") return `/series/${item.uid}`;
      if (item.type === "MOVIE") return `/movies/${item.uid}`;
      return "";
    }
  }
};
</script>
<style scoped>
.poster {
  display: inline;
}

.poster img {
  max-width: 120px;
}
</style>
