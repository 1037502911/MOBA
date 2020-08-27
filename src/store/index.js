import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import demo from './modules/demo'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        demo,
        settings,
        user
    },
    getters
})

export default store
