<template>
  <div>
    Blank view
    <p>{{ this.incState }}</p>
    <button @click="inc()">Increment</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Blank",
  methods: {
    inc() {
      this.$store.commit("increment");
    }
  },
  computed: mapState({
    incState: state => state.count
  })
};
</script>
