<template>

    <div id="app">
        <div class="container">
            <b-row>
                <b-col cols="4">
                    <input-component/>
                </b-col>

                <b-col cols="8">
                    <GmapMap
                        :center="{lat:42, lng:-88}"
                        :zoom="9"
                        map-type-id="terrain"
                        style="width: 50vw; height: 500px;"
                        >
                        <GmapMarker
                            :key="index"
                            ref="theMarker"
                            v-for="(m, index) in markers"
                            :position="new google.maps.LatLng(m[`Latitude`], m[`Longitude`])"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                        />
                    </GmapMap>

                    {{ markers }}

                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

    
    import InputComponent from './components/InputComponent.vue'
    import {gmapApi} from 'vue2-google-maps'
    

    export default {
        name: 'app',
        components: {
            
            InputComponent,
            
        },

        computed: {
            markers () {
                return this.$store.state.file;
            },

            google: gmapApi
        }
    }

</script>

<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>


