<template>
  <v-card @keydown="handleKeyboard" flat class="p-0 m-0 rounded-0 ">
    <highlightable-input
    flat
    :highlight="highlight"
    v-model="ScreenValue"
    :highlightEnabled="true"
    spellcheck="false"
    @input="detect"
    class="editor text-left px-3 pt-6 text-h5"
    />
  </v-card>
</template>

<script>
import HighlightableInput from "vue-highlightable-input"
import {styles} from '../../utils/textStyles';

export default {
  name: "Problem",
  data() {
    return {
      highlight: styles,
      timer:''
    }
  },
  components: {
    HighlightableInput
  },
  computed: {
    ScreenValue: {
      set(value) {
      this.$store.dispatch('setScreenValue',value);
    },
    get() {
      return this.$store.getters.getScreenValue
    }
    }
  },
  methods: {
    detect() {
      this.timer = setTimeout(() => this.$store.dispatch('setScreenValue',this.ScreenValue),1000);
    },
    handleKeyboard(e) {
      clearTimeout(this.timer);
      if(e.key=="Enter") {
        e.preventDefault();
        this.$store.dispatch('addPrevious',this.ScreenValue);
        }
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
.editor {
  height: 100vh;
  outline: none;
  font-family: 'Poppins',sans-serif;
  border-right: 1px solid #00000060;
}
</style>
