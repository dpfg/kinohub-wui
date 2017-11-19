<template>
  <v-container fluid>
    <v-layout column class="player">
      <v-flex class="cover">
        <img src="https://cdn.service-kp.com/poster/item/big/8726.jpg" alt="">
      </v-flex>
      <v-flex class="header">
        <span class="title">
          House Of Cards
        </span>
        <span class="desc">
          S4E5 Episode Name
        </span>
      </v-flex>
      <v-flex>
        <v-layout row nowrap justify-space-between align-center>
          <v-btn flat icon color="gray" class="size3" @click="omxCmd('seek_back_fast')">
            <v-icon>fast_rewind</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size2" @click="omxCmd('seek_back')">
            <v-icon>replay_30</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size1" @click="omxCmd('pause')">
            <v-icon>pause</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size2" @click="omxCmd('seek_forward')">
            <v-icon>forward_30</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size3" @click="omxCmd('seek_forward_fast')">
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { OmxClient } from "../services/omx";

export default {
  name: "Player",
  mounted: function() {
    this.omx = new OmxClient(this.$store.state.remotes.omx);
  },
  methods: {
    omxCmd(cmd) {
      this.omx.omxCmd(cmd);
    }
  }
};
</script>


<style scoped>
.player {
  max-width: 400px;
  margin: 0px auto;
}

.cover {
  text-align: center;
}

.cover img {
  width: 260px;
}

.header {
  text-align: center;
}

.header .title {
  display: block;
}
.header .desc {
  display: block;
}

.size3 .icon {
  font-size: 30px;
}

.size3 {
  height: 38px;
  width: 38px;
}

.size2 .icon {
  font-size: 42px;
}

.size2 {
  height: 50px;
  width: 50px;
}

.size1 .icon {
  font-size: 72px;
}

.size1 {
  height: 80px;
  width: 80px;
}
</style>
