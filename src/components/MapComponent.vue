<template>
    <div class="container-fluid" id="app" >
        <b-row>
            <b-col cols="4">

                
                
                <b-row>
                    <b-col>
                        <!-- <b-button @click="setFilters">Set Filters</b-button> -->
                    </b-col>
                    <b-col>
                        <b-button @click="clearFilters">Clear Filters</b-button>
                    </b-col>
                </b-row>
                
                <br>

                <b-row>
                    <b-col cols="4">Minimum</b-col>
                    <b-col cols="6">
                        <b-input-group size="md" prepend="$" append="000" maxLength="3">
                            <b-form-input v-model="minimumPrice"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col cols="4">Maximum</b-col>
                    
                    <b-col cols="6">
                        <b-input-group size="md" prepend="$" append="000">
                            <b-form-input v-model="maximumPrice"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                
                <b-row>
                    <!-- <b-checkbox v-model="filterByZip" value="true" unchecked-value="false"></b-checkbox> -->
                    <b-col cols="4">Filter By Zip Code</b-col>
                    
                    <b-col cols="6" v-if="$store.state.file">
                        <b-form-select v-model="selectedZip" :options="zip" >
                            <option value="null" selected disabled>Zip Code</option>
                
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
                            v-for="(m, index) in filteredMarkers"
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
    import {gmapApi} from 'vue2-google-maps'
    import { mapActions, mapGetters } from "vuex";

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
                
                filteredResults: [],
                price: true,
                minimumPrice: null,
                maximumPrice: null,
                selectedZip: null,
                clear: false,
                filter: {
                    zip: '',
                },
                appliedFilter: null
            }
        },

        methods: {
            getPosition(marker) {
                // eslint-disable-next-line
                console.log("THE MARKER: " + marker);
                
                return {
                    
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },

            toggleInfo(marker, key) {
                this.infoPosition = this.getPosition(marker.position)
                this.infoContent = marker.data["Full Address"]
                if (this.infoCurrentKey == key) {
                    this.infoOpened = !this.infoOpened
                } else {
                    this.infoOpened = true
                    this.infoCurrentKey = key
                }
            },

            setFilters() {
                
            },

            clearFilters() {
                this.clear = true;
                this.selectedZip = null;
                this.minimumPrice = null;
                this.maximumPrice = null;
            },

            applyFilter() {
                this.appliedFilter = {...this.filter};
            }
        },

        computed: {

            filteredMarkers() {

                // filteredItems() {
                //     let resultItems = [...this.items];
                    
                //     if (this.appliedFilter) {
                //         for (const field in this.appliedFilter) {
                //             const val = this.appliedFilter[field].trim().toLowerCase();
                //             if (val)
                //                 resultItems = resultItems.filter(i => i[field].toLowerCase() === val);
                //         }
                //     }
                    
                //     return resultItems;
                
                // }
                
                let self=this;

                this.filteredResults = this.$store.state.file;

                if(this.minimumPrice && this.maximumPrice){
                    this.filteredResults = this.$store.state.file.filter(home => parseInt(home.data.ESTIMATED_MARKET_VALUE) >= self.minimumPrice && home.data.ESTIMATED_MARKET_VALUE <= self.maximumPrice);
                }

                if(this.selectedZip){
                    this.filteredResults = this.$store.state.file.filter(home => home.data.Zip == self.selectedZip);
                }

                return this.filteredResults;
                
            },

            google: gmapApi,

            // create the zip code select options
            zip() {
                
                let homes = this.$store.state.file;
                let zipArray = new Array();

                homes.forEach(object => {
                    
                    // grab the zip code
                    let zip = parseInt(object['data']['Zip'], 10);
                    
                    // if it's not in the array, push it in
                    if (zipArray.indexOf(zip) === -1) {
                        zipArray.push(zip)
                    }
                });
                return zipArray;
            },

            ...mapGetters(['dataFile']),

        },

        created() {
            
        },

        mounted() {
            // eslint-disable-next-line
            console.log(process.env.NODE_ENV);

        }
    }
</script>
