<template>
  <v-card
    max-width="100%"
    height="100vh"
    flat
    class="rounded-0 text-h5 grey lighten-3 px-3 sm-pt-6 pt-2 text-left "
  >
    <span v-if="getScreenValue">{{ getSolution }}</span>
  </v-card>
</template>

<script>
export default {
  name: "Solution",
  computed: {
    getSolution() {
      return this.$store.getters.getTotal;
    },
    getScreenValue() {
      return !(this.$store.getters.getScreenValue[0] === "#");
    },
  },
};
</script>
