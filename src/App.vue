<template>

    <div class="container-fluid" id="app" >
        <b-row>
            <b-col cols="4">
                <input-component/>

                <br>

                <b-row class="instructions">
                    <b-col>
                        <p>You may select a minimum and maximum price.</p>
                        <p>Double click the group pin to zoom and expose individual pins.</p>
                        <p>Click individual pins to see address</p>
                    </b-col>
                </b-row>
                
                <br>

                <b-row>
                    <b-col cols="4">Minimum</b-col>
                    <b-col cols="8">
                        <b-input-group size="md" prepend="$" append=".00" label="Minimum">
                            <b-form-input v-model="minimumPrice"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="4">Maximum</b-col>
                    
                    <b-col cols="8">
                        <b-input-group size="md" prepend="$" append=".00" label="Maximum">
                            <b-form-input v-model="maximumPrice"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                
                <b-row>
                    <!-- <b-checkbox v-model="filterByZip" value="true" unchecked-value="false"></b-checkbox> -->
                    <b-col cols="4">Filter By Zip Code</b-col>
                    
                    <b-col cols="6" v-if="$store.state.file">
                        <b-form-select v-model="selectedZip" :options="zip" >
                            <option value="" selected disabled hidden>Zip Code</option>
                            <option value="null" >All</option>
                        </b-form-select>
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
                    <!-- <gmap-cluster> -->
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
                    <!-- </gmap-cluster> -->
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
                filterResults: [],
                price: true,
                minimumPrice: null,
                maximumPrice: null,
                selectedZip: '',
                filterByZip: false,
            }
        },

        methods: {
            getPosition: function(marker) {
                // eslint-disable-next-line
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

                if(this.minimumPrice){
                    this.filterResults = this.$store.state.file.filter(home => home.data.ESTIMATED_MARKET_VALUE >= self.minimumPrice && home.data.ESTIMATED_MARKET_VALUE <= self.maximumPrice);

                    return allMarkers;
                }

                if(this.selectedZip){
                    

                    let allMarkers = this.$store.state.file.filter(home => home.data.Zip == self.selectedZip);

                    return allMarkers;
                }
                
                return this.$store.state.file;
                
            },

            google: gmapApi,

            zip() {

                // let self = this;
                let homes = this.$store.state.file;
                let array = new Array();

                homes.forEach(object => {
                    
                    let zip = parseInt(object['data']['Zip'], 10);
                    
                    // if it's not in the array, push it in
                    if (array.indexOf(zip) === -1) {
                        array.push(zip)
                    }
                });

                return array;
            }

        },

        mounted() {

            // eslint-disable-next-line
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
        padding: 20px;
        font-size: 12px;
    }

</style>


