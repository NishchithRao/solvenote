<template>
  <v-container class="display px-0 py-0 mx-0" width="100%">
    <v-row no-gutters>
      <v-col cols="8" class="pr-0">
        <div
          spellcheck="false"
          :id="currentId"
          class="editor text-left px-3 pt-6 text-h5"
          v-html="formatedText"
        ></div
      ></v-col>
      <v-col cols="4" class="pl-0"
        ><v-card
          max-width="100%"
          flat
          class="rounded-0 text-h5 grey lighten-3  px-3 pt-6 text-left"
        >
          <span :class="getValues.expression=='total'||getValues.expression=='Total'&& 'total d-block font-weight-black'" v-if="!(getValues.expression[0]==='#')">{{ formatedTextValue }}</span>
          <span v-else class="grey lighten-3  px-3 pt-2"></span>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import {highlightNumbers,highlightHeading} from '../utils/helpers';
export default {
  name: "Display",
  data() {
    return {
      numFormat: new Intl.NumberFormat('en-IN',{maximumSignificantDigits:3})
    }
  },
  created() {
    console.log('expr',this.getValues.expression);
  },
  computed: {
    formatedText() {
      return this.format(this.getValues.expression)
    },
    formatedTextValue() {
      console.log('formatedTextValue');
      return this.numFormat.format(this.getValues.value)
    }
  },
  methods: {
    format(value) {
      value = highlightHeading(value);
      value = highlightNumbers(value);
      return value
    }
  },
  props: {
    getValues: {
      expression: "",
      value: "",
    },
    currentId: {
      value: 0,
    },
  },
};
</script>

<style>
.display {
  max-width: 100% !important;
}
.editor {
  border-right: 1px solid #00000060;
}
.number {
  color: blue;
}
.heading {
  font-weight: bold;
  color: black;
}
.total {
  border-top: 1px solid lightgrey;
}
</style>
