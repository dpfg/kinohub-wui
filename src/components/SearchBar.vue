<template>
  <v-layout row align-center style="max-width: 650px">
    <v-text-field
      placeholder="Search..."
      single-line
      append-icon="search"
      :append-icon-cb="() => {}"
      class="white--text"
      hide-details
      v-model="query"
    ></v-text-field>
  </v-layout>
</template>

<script>
export default {
  name: "SearchBar",
  computed: {
    query: {
      get() {
        return this.$store.state.search.query;
      },
      set(value) {
        this.$store.dispatch("search", value);
        // console.log(value.length);
        // if (value.length > 4) {
        //   this.$store.commit("updateSearchQuery", value);
        //   return;
        // }
      }
    }
  }
};
</script>
