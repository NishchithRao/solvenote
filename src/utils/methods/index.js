export const operations = {
    clear: function(commit) {
        commit('setScreenValue','');
        commit('addProblem','');
        commit('addPrevious',true);
    },
    total: function(commit) {
        commit('setSubTotal');
        commit('setScreenValue','');
        commit('addPrevious');
    },
    save: function(commit,state) {
        const date = new Date();
        localStorage.setItem(`solvenote-${date.toLocaleString(Date.now())}`,state.previous);
    }
}

export const typographicMathSymbols = {
  '*': '\u00d7',
  '+': '\u002b',
  '-': '\u2212',
  '/': '\u00f7',
}
export const operators = {
  "+": function(a, b) {
    let subTotal = a + b;
    return subTotal;
  },
  "-": function(a, b) {
    let subTotal = a - b;
    return subTotal;
  },
  "*": function(a, b) {
    let subTotal = a * b;
    return subTotal;
  },
  "/": function(a, b) {
    let subTotal = a / b;
    return subTotal;
  },
  "^": function(a, b) {
    let subTotal = Math.pow(a, b);
    return subTotal;
  },
  "%": function(a, b) {
    let subTotal = (a / b) * 100;
    return subTotal;
  },
};