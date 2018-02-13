<template>
  <v-container fluid>
    <v-layout column class="player" v-if="status.running">
      <v-flex class="cover">
        <router-link :to="statusLink">
          <img :src="statusCover" alt="">
        </router-link>
      </v-flex>
      <v-flex class="header">
        <span class="title">
          {{statusTitle}}
        </span>
        <span class="desc" v-if="statusSubTitle">
          {{statusSubTitle}}
        </span>
      </v-flex>
      <v-flex class="controls">
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
    <v-layout justify-center align-center v-if="!status.running">
      <div class="msg-box grey darken-3">
        <span class="msg grey--text">Nothing is playing at the moment...</span>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import { OmxClient } from "../services/omx";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Player",
  created: function() {
    this.omx = new OmxClient(this.$store.state.remotes.omx);
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapGetters([
      "statusCover",
      "statusTitle",
      "statusSubTitle",
      "statusLink"
    ])
  },
  mounted: function() {
    this.$store.dispatch("updateStatus");
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
  margin-top: 12px;
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

.msg-box {
  padding: 20px 40px;
  border-radius: 4px;
}
</style>
