import Vue from 'vue'
import Vuex from 'vuex'
import { solveExpression } from '../utils/calculate'
import { operations } from '../utils/constants'
import { extractText } from '../utils/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    problem:"",
    screenValue:"",
    total:0,
    previous: [],
  },
  mutations: {
    addProblem(state,value) {
      state.problem = extractText(value);
    },
    solve(state,fun) {
      state.total = fun(state.problem) || 0;
    },
    setScreenValue(state,value) {
      state.screenValue = value;
    },
    addPrevious(state,value) {
      let currentExpresssion = {
        expression: state.problem,
        value: state.total
      }
      if(!value)
      state.previous.push(currentExpresssion);
      else state.previous = []
    },
    setSubTotal(state) {
      let total = 0;
      state.previous.map(el => total +=el.value);
      console.log('total',total);
      state.total = total
    }
  },
  actions: {
    addProblem({commit},value) {
      commit("addProblem",value);
      commit('solve',solveExpression);
    },
    solve({commit}) {
      commit('solve',solveExpression);
    },
    setScreenValue({commit},value) {
      commit('setScreenValue',value);
      commit('addProblem',value);
      commit('solve',solveExpression);
    },
    addPrevious({commit},value) {
      value = value.replace(/\//gm,"");
      value = value.toLowerCase();
      value = value.replace(/[^total]\w+/g,"");
      console.log(value);
      if(operations[value]) {
        operations[value](commit);
      }
      else {
      commit('addPrevious');
      commit('setScreenValue','');
      commit('solve',solveExpression);
      }
    },
    setSubTotal({commit}) {
      commit('setSubTotal');
    }
  },
  modules: {
  },
  getters: {
    getTotal(state) {
      return state.total
    },
    getScreenValue(state) {
      return state.screenValue
    },
    getPrevious(state) {
      return state.previous
    },
    getProblem(state) {
      return state.problem
    },
  }
})
