import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

import * as VueGoogleMaps from 'vue2-google-maps'

import {GmapMarker} from 'vue2-google-maps/src/components/marker'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'



Vue.use(VueGoogleMaps, {
  load: {
    region: 'US',
    language: 'en',
    key: process.env.VUE_APP_GMAP_KEY
    
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
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


