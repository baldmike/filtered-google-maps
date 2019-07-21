import Vue from 'vue' 
import Vuex from 'vuex'
import data from './fullData'

Vue.use(Vuex)

export default new Vuex.Store({

    state() {
        return {
            file: []
        }
    },

    mutations: {

        setFile(state, payload) {
            state.file = payload;
        },
    },

    actions: {

        setFile(context) {
            let homeMarkers = new Array();
                            
            // pull the lat/lon out and make 'position' and 'data' objects for marker
            data.forEach(row => {

                let lat = parseFloat(row['Latitude']);
                let lon = parseFloat(row['Longitude']);
                let latlon = {position: {'lat':lat, 'lng': lon}, data: row };
                homeMarkers.push(latlon);

            });

            context.commit('setFile', homeMarkers)
            
        },
    }
})