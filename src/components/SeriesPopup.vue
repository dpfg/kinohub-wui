<template>
  <v-layout row>
    <v-dialog v-model="dialog"  fullscreen :overlay="true">
      <v-flex xs12 md4 offset-md4 sm8 offset-sm2 class="popup-body">
        <SeriesCmp></SeriesCmp>
      </v-flex>
    </v-dialog>
  </v-layout>
</template>
<script>
import SeriesCmp from "@/components/SeriesCmp";

export default {
  data: () => ({
    dialog: true
  }),
  components: {
    SeriesCmp
  }
};
</script>

<style>
.popup-body {
  margin-top: 64px;
}

@media screen and (max-width: 600px) {
  .popup-body {
    margin-top: 0px;
  }
}
</style>
