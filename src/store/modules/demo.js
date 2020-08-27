const state = {
    count: 1
}

const mutations = {
    addItem(state, num) {
        state.count += num;
    }
}

const actions ={
     
}

export default {
    namespaced: true,
    state,
    mutations
}