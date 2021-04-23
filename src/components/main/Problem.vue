<template>
  <v-card @keydown="handleKeyboard" flat class="p-0 m-0 rounded-0 ">
    <highlightable-input
      flat
      :highlight="highlight"
      v-model="ScreenValue"
      :highlightEnabled="true"
      spellcheck="false"
      @input="detect"
      class="editor text-left px-3 sm-pt-6 pt-2 pb-3 sm-pb-0 text-h5"
    />
  </v-card>
</template>

<script>
import HighlightableInput from "vue-highlightable-input";
import { typographicMathSymbols } from "../../utils/methods";
import { styles } from "../../utils/textStyles";

export default {
  name: "Problem",
  data() {
    return {
      highlight: styles,
      timer: "",
    };
  },
  components: {
    HighlightableInput,
  },
  computed: {
    ScreenValue: {
      set(value) {
        this.$store.dispatch("setScreenValue", value);
      },
      get() {
        return this.replacedOperators(this.$store.getters.getScreenValue);
      },
    },
  },
  methods: {
    detect() {
      this.timer = setTimeout(
        () => this.$store.dispatch("setScreenValue", this.ScreenValue),
        1000
      );
    },
    replacedOperators(val) {
      if (val)
        Object.keys(typographicMathSymbols).map(
          (item) => (val = val.replaceAll(item, typographicMathSymbols[item]))
        );
      return val;
    },
    handleKeyboard(e) {
      clearTimeout(this.timer);
      if (e.key == "Enter") {
        e.preventDefault();
        if (this.ScreenValue == "darkmode") {
        this.$store.dispatch("addPrevious", this.ScreenValue);
          this.$store.dispatch("toggleDarkMode",true);
        }
        else if (this.ScreenValue == "lightmode") {
        this.$store.dispatch("addPrevious", this.ScreenValue);
          this.$store.dispatch("toggleDarkMode",false);
        }
        else {
        this.$store.dispatch("addPrevious", this.ScreenValue);
        }
        this.$vuetify.theme.dark = this.$store.getters.toggleDarkMode;
      }
      if (e.key == "Backspace") {
        if (!this.ScreenValue) {
          this.$store.dispatch("removePreviousValue");
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
.editor {
  height: 100vh;
  outline: none;
  font-family: "Poppins", sans-serif;
  border-right: 1px solid #00000060;
}
@media (max-width: 480px) {
  .editor {
    height: fit-content;
  }
}
</style>
