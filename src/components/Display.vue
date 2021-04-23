<template>
  <v-container class="display px-0 py-0 mx-0" width="100%">
    <v-row no-gutters>
      <v-col sm="8" cols="12" class="pr-0">
        <div
          spellcheck="false"
          :id="currentId"
          class="editor secondaryBg black--text text-left px-3 sm-pt-6 pt-2 pb-3 sm-pb-0 text-h5"
          v-html="formatedText"
        ></div
      ></v-col>
      <v-col sm="4" cols="12" class="pl-0"
        ><v-card
          max-width="100%"
          flat
          height="100%"
          class="rounded-0 text-h5 grey lighten-3  px-3 pt-2 sm-pb-0 pb-2 sm-pt-6 text-left"
        >
          <span
            :class="
              (getValues.expression == 'total' ||
                getValues.expression == 'Total') &&
                  'total d-block font-weight-black'
            "
            v-if="!(getValues.expression[0] === '#')"
            >{{ formatedTextValue }}</span
          >
          <span v-else class="grey lighten-3  px-3 pt-2"></span> </v-card
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  highlightNumbers,
  highlightHeading,
  changeOperators,
} from "../utils/helpers";
export default {
  name: "Display",
  data() {
    return {
      numFormat: new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }),
    };
  },
  created() {
    console.log("expr", this.getValues.expression=='total');
  },
  computed: {
    formatedText() {
      return this.format(this.getValues.expression);
    },
    formatedTextValue() {
      return this.numFormat.format(this.getValues.value);
    },
  },
  methods: {
    format(value) {
      value = highlightHeading(value);
      value = changeOperators(value);
      value = highlightNumbers(value);
      return value;
    },
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
.operator {
  color: orchid;
}
@media (max-width: 480px) {
  .editor {
    height: fit-content;
  }
}
</style>
