import Vue from 'vue'
import Vuex from 'vuex'
import incident from './incident'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        incident: incident,
    }
})
