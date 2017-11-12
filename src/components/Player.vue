<template>
  <v-container fluid>
    <v-layout column>
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
          <v-btn flat icon color="gray" class="size3">
            <v-icon>fast_rewind</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size2">
            <v-icon>replay_30</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size1">
            <v-icon>pause</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size2">
            <v-icon>forward_30</v-icon>
          </v-btn>
          <v-btn flat icon color="gray" class="size3">
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Player"
};
</script>


<style scoped>
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
  font-size: 32px;
}

.size3 {
  height: 40px;
  width: 40px;
}

.size2 .icon {
  font-size: 48px;
}

.size2 {
  height: 56px;
  width: 56px;
}

.size1 .icon {
  font-size: 80px;
}

.size1 {
  height: 88px;
  width: 88px;
}
</style>
