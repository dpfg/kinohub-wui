<template>
  <v-container fluid>
    <v-layout row wrap v-if="!loading">
      <v-flex d-flex xs12 md3 lg3 class="search-result-card" v-for="item in result"  v-bind:key="item.uid">
        <v-card  class="white--text">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div>
                  <div>{{ item.title }}</div>
                  <div>{{ item.type }}</div>
                </div>
              </v-flex>
              <v-flex xs5>
                  <v-card-media
                    v-bind:src="item.poster_path"
                    height="125px"
                    contain
                  ></v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center v-if="loading">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script>
import mock from "../mocks/search.json";
import { mapState } from "vuex";

export default {
  name: "SearchResult",
  computed: {
    ...mapState({
      loading: state => state.search.inProgress,
      result: state => state.search.result
    })
  }
};
</script>
<style>
.search-result-card {
  margin: 5px;
}

@media screen and (max-width: 600) {
  .search-result-card {
    margin: 10px 0px 10px 0px;
  }
}
</style>
