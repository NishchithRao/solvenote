<template>
  <v-container class="home px-0 py-0" fluid>
    <v-row align-content-lg="center" no-gutters>
      <v-col cols="12" v-for="(item, index) in display" :key="index">
        <display :currentId="index" :getValues="item" />
      </v-col>
    </v-row>
    <v-row align-content="center" no-gutters>
      <v-col sm="8" cols="12">
        <problem />
      </v-col>
      <v-col sm="4" cols="12">
        <solution />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Display from "../components/Display.vue";
import Problem from "../components/main/Problem.vue";
import Solution from "../components/main/Solution.vue";
// @ is an alias to /src

export default {
  components: { Problem, Solution, Display },
  name: "Home",
  computed: {
    display() {
      return this.$store.getters.getPrevious;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
.v-application .text-h5 {
  font-family: "Poppins", sans-serif !important;
}
.home {
  border-top: 1px solid #00000060;
}
</style>
