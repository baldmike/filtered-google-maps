<template>

    <div id="app" >
            <b-row>
                <b-col cols="4">
                    <input-component/>

                    <b-form-checkbox
                            id="checkbox-1"
                            v-model="price"
                            name="checkbox-1"
                            value="accepted"
                            unchecked-value=""/>
                    
                </b-col>

                <b-col cols="8">
                    <GmapMap
                        :center="{lat:41.8, lng:-87.7}"
                        :zoom="11"
                        map-type-id="terrain"
                        style="width: 100%; height: 80vh;"
                        >
                        <gmap-cluster>
                                <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
                                {{ infoContent }}
                                </gmap-info-window>
                            <GmapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @click="toggleInfo(m, index)"/>
                        </gmap-cluster>
                    </GmapMap>
                </b-col>
            </b-row>
    </div>
</template>

<script>

    
    import InputComponent from './components/InputComponent.vue'
    import {gmapApi} from 'vue2-google-maps'
    
    export default {
        name: 'app',

        data() {
            return {
                infoPosition: null,
                infoContent: null,
                infoOpened: false,
                infoCurrentKey: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                price: false,
            }
        },

        methods: {
            getPosition: function(marker) {
                console.log("THE MARKER: " + marker);
                
                return {
                    
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },
            toggleInfo: function(marker, key) {
                this.infoPosition = this.getPosition(marker.position)
                this.infoContent = marker.data
                if (this.infoCurrentKey == key) {
                    this.infoOpened = !this.infoOpened
                } else {
                    this.infoOpened = true
                    this.infoCurrentKey = key
                }
            }
        },

        components: {
            
            InputComponent,
            
        },

        computed: {
            markers () {

                return this.$store.state.file;

            },

            google: gmapApi

        },

        mounted() {

            console.log(process.env.NODE_ENV);

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


