import Vue from "vue";
import Vuex from "vuex";
import { solveExpression } from "../utils/calculate";
import { operations } from "../utils/methods";
import { extractText } from "../utils/helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    problem: "",
    screenValue: "",
    total: 0,
    previous: [],
    variables: {},
    darkmode: false,
  },
  mutations: {
    addProblem(state, value) {
      if (value.indexOf("=") < 0) {
        Object.keys(state.variables).map(
          (variable) =>
            (value = value.replaceAll(variable, state.variables[variable]))
        );
      }
      state.problem = extractText(value);
    },
    solve(state, fun) {
      state.total = fun(state.problem) || 0;
    },
    setScreenValue(state, value) {
      state.screenValue = value;
    },
    addPrevious(state, value) {
      let currentExpresssion = {
        expression: state.screenValue || state.problem,
        value: state.total,
      };
      if (!value) state.previous.push(currentExpresssion);
      else state.previous = [];
    },
    setSubTotal(state) {
      let total = 0;
      state.previous.map((el) => (total += el.value));
      state.total = total;
    },
    toggleDarkMode(state,value) {
      console.log('dark',value);
      state.darkmode = value;
      state.screenValue='';
      state.problem='';
      state.previous.pop();
    }
  },
  actions: {
    addProblem({ commit }, value) {
      commit("addProblem", value);
      commit("solve", solveExpression);
    },
    solve({ commit }) {
      commit("solve", solveExpression);
    },
    setScreenValue({ commit, state }, value) {
      let varIndex = [];
      let match = [];
      let reg = /=/gm;
      while ((match = reg.exec(value)) !== null) {
        varIndex.push(match.index);
      }
      varIndex.map((index) => {
        let variable = value.substr(0, index);
        let val = parseFloat(value.substr(index + 1, value.length - 1));
        state.variables[variable] = val;
      });
      commit("setScreenValue", value);
      commit("addProblem", value);
      commit("solve", solveExpression);
    },
    addPrevious({ commit, state }, value) {
      value = value.replace(/\//gm, "");
      value = value.toLowerCase();
      if (value.indexOf("total") > 0) value = value.replace(/[^total]\w+/g, "");
      if (operations[value]) {
        operations[value](commit, state);
      } else {
        commit("addPrevious");
        commit("setScreenValue", "");
        commit("solve", solveExpression);
      }
    },
    setSubTotal({ commit }) {
      commit("setSubTotal");
    },
    toggleDarkMode({commit},value) {
      console.log('yy');
      commit('toggleDarkMode',value);
    },
    removePreviousValue({commit,state}) {
      state.screenValue=state.previous[state.previous.length-1];
      console.log(state.previous);
      let preValue=state.previous.pop();
      commit("setScreenValue",preValue.expression);
      commit("addProblem",preValue.expression);
      commit("solve",solveExpression);
    }
  },
  modules: {},
  getters: {
    getTotal(state) {
      return state.total;
    },
    getScreenValue(state) {
      return state.screenValue;
    },
    getPrevious(state) {
      return state.previous;
    },
    getProblem(state) {
      return state.problem;
    },
    toggleDarkMode(state) {
      return state.darkmode;
    }
  },
});
