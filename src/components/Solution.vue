<template>
    <v-card max-width="100%" height="100vh" flat class="rounded-0 text-h5 grey lighten-3 px-3 pt-6 text-left ">
        <span v-if="getProblem">{{getSolution}}</span>
    </v-card>
</template>

<script>
    export default {
        name:"Solution",
        computed: {
            getSolution() {
                return this.$store.getters.getTotal
            },
            getProblem() {
                return Number(this.$store.getters.getProblem)
            }
        }
    }
</script>
