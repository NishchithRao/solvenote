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
        console.log(commit);
        const date = new Date();
        localStorage.setItem(`solvenote-${date.toLocaleString(Date.now())}`,state.previous);
    }
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
    let subTotal = (a * b) / 100;
    return subTotal;
  },
};