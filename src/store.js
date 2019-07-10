import Vue from 'vue' 
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({

    state() {
        return {
            file: null
        }
    },
    getters: { 
        // getters get data from state and are available in components

        // !! returns a boolean
        isFile: state => !!state.file,
    },
    mutations: {
        // mutations are committed by actions, and are the ONLY way to manipulate state

        setFile(state, payload) {
            state.file = payload;
        },
    },


    actions: {
        // actions are dispatched in component, they commit mutations =- make API calls here

        setFile(context, payload) {
            // eslint-disable-next-line no-console
            console.log("You just walked into the store with " + payload);
            context.commit('setFile', payload)
        },
    }
})