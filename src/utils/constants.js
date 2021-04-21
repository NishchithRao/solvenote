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