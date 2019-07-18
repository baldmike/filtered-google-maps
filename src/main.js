import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

import * as VueGoogleMaps from 'vue2-google-maps'
import {GmapMarker} from 'vue2-google-maps/dist/components/marker'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'



Vue.use(VueGoogleMaps, {
  load: {
  
    region: 'US',
    language: 'en',
    key: process.env.VUE_APP_GMAP_KEY
    
  },

  installComponents: true

})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.component('GmapMarker', GmapMarker)
Vue.component('GmapCluster', GmapCluster)

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')


