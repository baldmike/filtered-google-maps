<template>
    <div class="container-fluid" id="app" >
        <b-col cols="12">
                <h6><a href="https://github.com/baldmike/filtered-google-maps">VIEW CODE</a></h6>
            </b-col>
        <b-row>
            
            <b-col cols="6" class="sidebar">
                <br>
                
                <!-- Filters -->
                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Estimated Market Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Min $">
                            <b-form-input v-model="filters.minimumValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Max $">
                            <b-form-input v-model="filters.maximumValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Current Land Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Min $">
                            <b-form-input v-model="filters.minimumCurrentLandValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Max $">
                            <b-form-input v-model="filters.maximumCurrentLandValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Current Building Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Min $">
                            <b-form-input v-model="filters.minimumCurrentBuildingValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Max $">
                            <b-form-input v-model="filters.maximumCurrentBuildingValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Current Total Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Min $">
                            <b-form-input v-model="filters.minimumCurrentTotalValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="md" prepend="Max $">
                            <b-form-input v-model="filters.maximumCurrentLandTotalValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="6" >
                        <b-form-select v-model="filters.Zip" :options="zip" class="sidebar">
                            <option value="null" selected>Zip Code</option>
                
                        </b-form-select>
                    </b-col>

                    <b-col cols="6" >
                        <b-form-select v-model="filters.OVACLS" :options="ovacls" class="sidebar">
                            <option value="null" selected>OVACLS</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select v-model="filters.CLASS_DESCRIPTION" :options="class_description" class="sidebar">
                            <option value="null" selected>Class Description</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select v-model="filters.RES_TYPE" :options="res_type" class="sidebar">
                            <option value="null" selected>Res Type</option>
                        </b-form-select>
                    </b-col>
                    <b-col>
                        <b-form-select v-model="filters.NEIGHBORHOOD" :options="neighborhood" class="sidebar">
                            <option value="null" selected>Neighborhood</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row>
                    <b-col>
                        <h3 v-if="!this.$store.state.file">Please upload a CSV file.</h3>
                    </b-col>
                    <b-col cols="12" v-if="this.$store.state.file">
                        <H6>NUMBER OF MATCHES: {{ numberOfResults }}</H6>
                    </b-col>

                    <br>

                    <b-col cols="12" v-if="this.$store.state.file">
                        <b-button @click="clearFilters" type="danger">Clear Filters</b-button>
                    </b-col>
                </b-row>
            </b-col>

            <b-col cols="6">
                <GmapMap
                    :center="{lat:41.9, lng:-87.7}"
                    :zoom="12"
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
                            :icon="icon(m)"
                            :clickable="true"
                            :draggable="true"
                            @mouseover="toggleInfo(m, index)"/>
                    <!-- </gmap-cluster> -->
                </GmapMap>
            </b-col>
        </b-row>
    </div>
</template>


<script>
    import {gmapApi} from 'vue2-google-maps'
    import { mapActions, mapGetters } from "vuex";
    import { stringify } from 'querystring';

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
                filteredResults: null,
                clear: false,
                filters: {
                    Zip: null,
                    OVACLS: null,
                    CLASS_DESCRIPTION: null,
                    RES_TYPE: null,
                    NEIGHBORHOOD: null,
                    minimumValue: null,
                    maximumValue: null,
                    minimumCurrentLandValue: null,
                    maximumCurrentLandValue: null,
                    minimumCurrentBuildingValue: null,
                    maximumCurrentBuildingValue: null,
                },
                applyFilters: false,
            }
        },

        methods: {
            getPosition(marker) {            
                return {
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },

            toggleInfo(marker, key) {
                this.infoPosition = this.getPosition(marker.position)
                this.infoContent = marker.data["Full_Address"]
                if (this.infoCurrentKey == key) {
                    this.infoOpened = !this.infoOpened
                } else {
                    this.infoOpened = true
                    this.infoCurrentKey = key
                }
            },

            clearFilters() {
                this.clear = true;
                this.filters.Zip = null;
                this.filters.OVACLS = null;
                this.filters.CLASS_DESCRIPTION = null;
                this.filters.RES_TYPE = null;
                this.filters.NEIGHBORHOOD = null;
                this.minimumValue = null;
                this.maximumValue = null;
                this.minimumCurrentLandValue = null;
                this.maximumCurrentLandValue = null;
                this.minimumCurrentBuildingValue = null;
                this.maximumCurrentBuildingValue = null;
                this.minimumTotalValue = null;
                this.maximumTotalValue = null;
            },
            icon(m) {
                let value = m.data["ESTIMATED_MARKET_VALUE"];
                
                if(parseInt(value) < 400000){
                    return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|00FF00|000000`
                }

                if(parseInt(value) < 500000){
                    return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FF4900|000000`
                }

                if(parseInt(value) < 600000){
                    return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FFA200|000000`
                }

                if(parseInt(value) < 700000){
                    return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FFE400|000000`
                }

                if(parseInt(value) < 800000){
                    return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|C9FF00|000000`
                }

                if(parseInt(value) < 900000){
                    return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|93FF00|000000`
                }

                return `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FF0000|000000`
            },
        },

        computed: {
            filteredMarkers() {
                let self=this;

                if(!this.applyFilters){
                    this.filteredResults = this.$store.state.file;
                }

                if(this.filters.Zip){
                    this.filteredResults = this.$store.state.file.filter(item => item.data['Zip'] == self.filters.Zip);
                }

                if(this.filters.OVACLS){
                    this.filteredResults = this.filteredResults.filter(item => item.data['OVACLS'] == self.filters.OVACLS);
                }

                if(this.filters.CLASS_DESCRIPTION){
                    this.filteredResults = this.filteredResults.filter(item => item.data['CLASS_DESCRIPTION'] == self.filters.CLASS_DESCRIPTION);
                }

                if(this.filters.RES_TYPE){
                    this.filteredResults = this.filteredResults.filter(item => item.data['RES_TYPE'] == self.filters.RES_TYPE);
                }

                if(this.filters.NEIGHBORHOOD){
                    this.filteredResults = this.filteredResults.filter(item => item.data['NEIGHBORHOOD'] == self.filters.NEIGHBORHOOD);
                }

                if(this.filters.minimumValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data['ESTIMATED_MARKET_VALUE'].replace(/,/g, '')) >= self.filters.minimumValue)
                }

                if(this.filters.maximumValue) {
                    this.filteredResults = this.$store.state.file.filter(item => parseInt(item.data['ESTIMATED_MARKET_VALUE'].replace(/,/g, '')) <= self.filters.maximumValue);
                }

                if(this.filters.minimumCurrentLandValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data['CURRENT_LAND'].replace(/,/g, '')) >= self.filters.minimumCurrentLandValue)
                }

                if(this.filters.maximumCurrentLandValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data['CURRENT_LAND'].replace(/,/g, '')) <= self.filters.maximumCurrentLandValue);
                }

                if(this.filters.minimumCurrentBuildingValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data['CURRENT_BUILDING'].replace(/,/g, '')) >= self.filters.minimumCurrentBuildingValue)
                }

                if(this.filters.maximumCurrentBuildingValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data['CURRENT_BUILDING'].replace(/,/g, '')) <= self.filters.maximumCurrentBuildingValue);
                }    
                return this.filteredResults;
            },

            numberOfResults() {
                if(this.filteredResults) {
                    return this.filteredResults.length;
                }

                return 0;
            },

            google: gmapApi,

            


            // ----------------------------------CREATE SELECT OPTIONS

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

            ovacls() {
                
                
                let homes = this.$store.state.file;
                let ovaclsArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let ovacls = parseInt(object['data']['OVACLS'], 10);
                    
                    // if it's not in the array, push it in
                    if (ovaclsArray.indexOf(ovacls) === -1) {
                        ovaclsArray.push(ovacls)
                    }
                });
                return ovaclsArray;
            
            },

            class_description() {
                
                
                let homes = this.$store.state.file;
                let classDescriptionArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let classDescription = object['data']['CLASS_DESCRIPTION'];
                    
                    // if it's not in the array, push it in
                    if (classDescriptionArray.indexOf(classDescription) === -1) {
                        classDescriptionArray.push(classDescription)
                    }
                });
                return classDescriptionArray;
                
            },
            
            res_type() {
                
                
                let homes = this.$store.state.file;
                let resTypeArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let resType = object['data']['RES_TYPE'];
                    
                    // if it's not in the array, push it in
                    if (resType && resTypeArray.indexOf(resType) === -1) {
                        resTypeArray.push(resType)
                    }
                });
                return resTypeArray;
                
            },

            neighborhood() {

                
                let homes = this.$store.state.file;
                let neighborhoodArray = new Array();

                homes.forEach(object => {
                    
                    // grab the neighborhood
                    let neighborhood = object['data']['NEIGHBORHOOD'];
                    
                    // if it's not in the array, push it in
                    if (neighborhoodArray.indexOf(neighborhood) === -1) {
                        neighborhoodArray.push(neighborhood)
                    }
                });
                return neighborhoodArray;
                
            },
        },
        
        created() {
            
        },

        mounted() {

        }
    }
</script>

<style>
    .sidebar {
        margin-top: 10px;
    }
</style>
