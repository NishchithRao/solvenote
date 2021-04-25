import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: false,
themes: {
    light: {
        heading: '#fff'
    },
    dark: {
        grey:'#121212',
        black:'#fff',
        primaryBg: '#121212',
        secondaryBg: '#1e1e1e',
        heading:'#fff'
    }
} },
});
