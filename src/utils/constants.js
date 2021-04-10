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
    }
}