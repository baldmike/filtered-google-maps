<template>

    <div id="app" >
            <b-row>
                <b-col cols="4">
                    <input-component/>

                    <br>

                    <h5>You may select a minimum and maximum price.</h5>
                    <h5>Double click the group pin to zoom and expose individual pins.</h5>
                    <h5>Double click individual pins to see address</h5>

                    <br>

                    <b-row>
                        <b-col cols="4">Minimum</b-col>
                        <b-col cols="8">
                            <b-input-group size="md" prepend="$" append=".00" label="Minimum">
                                <b-form-input v-model="minimumPrice"></b-form-input>
                            </b-input-group>
                        </b-col>

                        <b-col cols="4">Maximum</b-col>
                        <b-col cols="8">
                            <b-input-group size="md" prepend="$" append=".00" label="Maximum">
                                <b-form-input v-model="maximumPrice"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>

                </b-col>

                <b-col cols="8">
                    <GmapMap
                        :center="{lat:41.9, lng:-87.7}"
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
                price: true,
                minimumPrice: null,
                maximumPrice: null,
                filterResults: null
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
                this.infoContent = marker.data["Full Address"]
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

            markers() {
                let self=this;
                let filterResults = [];

                if(this.minimumPrice){
                    let allMarkers = this.$store.state.file.filter(home => home.data.ESTIMATED_MARKET_VALUE >= self.minimumPrice && home.data.ESTIMATED_MARKET_VALUE <= self.maximumPrice);

                    return allMarkers;
                }
                
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


