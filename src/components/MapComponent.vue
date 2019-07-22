<template>
    <div class="container-fluid" id="app" >
        
        <b-row>
            
            <b-col cols="12" md="6" class="sidebar">
                <br>
                
                <b-row>
                    <b-col cols="4" v-if="this.$store.state.file">
                        <b-button @click="clearFilters" type="danger">CLEAR FILTERS</b-button>
                    </b-col>

                    <b-col cols="4">
                        <div class="header"><h2> FILTERS </h2></div>
                    </b-col>

                    <b-col cols="4" v-if="this.$store.state.file">
                        <div class="matchbox">
                            <p style="font-size: 1rem">NUMBER OF MATCHES: {{ numberOfResults }}</p>
                        </div>
                    </b-col>
                </b-row>

                <!-- Filters -->
                <br>

                <b-row>
                    <b-col cols="6">
                        <b-input-group size="sm" prepend="Address">
                            <b-form-input v-model="filters.address"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="6" >
                        <b-form-select size="sm" v-model="filters.Zip" :options="zip" class="sidebar">
                            <option value="null" selected disabled>Zip Code</option>
                
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                 <b-row v-if="$store.state.file">
                    <b-col cols="6" >
                        <b-form-select size="sm" v-model="filters.REC_TYPE" :options="rec_type" class="sidebar">
                            <option value="null" selected disabled>REC_TYPE</option>
                
                        </b-form-select>
                    </b-col>
                    <b-col cols="6">
                        <b-form-select size="sm" v-model="filters.PIN" :options="pin" class="sidebar">
                            <option value="null" selected disabled>PIN</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="6" >
                        <b-form-select size="sm" v-model="filters.OVACLS" :options="ovacls" class="sidebar">
                            <option value="null" selected disabled>OVACLS</option>
                        </b-form-select>
                    </b-col>

                    <b-col cols="6">
                        <b-form-select size="sm" v-model="filters.CLASS_DESCRIPTION" :options="class_description" class="sidebar">
                            <option value="null" selected disabled>Class Description</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Current Land Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumCurrentLandValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumCurrentLandValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Current Building Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumCurrentBuildingValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumCurrentBuildingValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Current Total Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumCurrentTotalValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumCurrentTotalValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Estimated Market Value</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumMarketValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumMarketValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Prior Land Value (2103)</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumPriorLandValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumPriorLandValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Prior Building Value (2103)</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumPriorBuildingValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumPriorBuildingValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col cols="4"><h6>Prior Total Value  (2103)</h6></b-col>
                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Min $">
                            <b-form-input v-model="filters.minimumPriorTotalValue"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="4" >
                        <b-input-group size="sm" prepend="Max $">
                            <b-form-input v-model="filters.maximumPriorTotalValue"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.TOWN" :options="town" class="sidebar">
                            <option value="null" selected disabled>Town</option>
                        </b-form-select>
                    </b-col>
                    <b-col>
                        <b-form-select size="sm" v-model="filters.VOLUME" :options="volume" class="sidebar">
                            <option value="null" selected disabled>Volume</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.LOC" :options="loc" class="sidebar">
                            <option value="null" selected disabled>LOC</option>
                        </b-form-select>
                    </b-col>
                    <b-col>
                        <b-form-select size="sm" v-model="filters.TAX_CODE" :options="tax_code" class="sidebar">
                            <option value="null" selected disabled>Tax Code</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.NEIGHBORHOOD" :options="neighborhood" class="sidebar">
                            <option value="null" selected disabled>Neighborhood</option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-form-select size="sm" v-model="filters.RES_TYPE" :options="res_type" class="sidebar">
                            <option value="null" selected disabled>Res Type</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.BLDG_USE" :options="bldg_use" class="sidebar">
                            <option value="null" selected disabled>Bldg Use</option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-form-select size="sm" v-model="filters.APT_DESC" :options="apt_desc" class="sidebar">
                            <option value="null" selected disabled>Apt_Desc</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.COMM_UNITS" :options="comm_units" class="sidebar">
                            <option value="null" selected disabled>Comm Units</option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-form-select size="sm" v-model="filters.EXT_DESC" :options="ext_desc" class="sidebar">
                            <option value="null" selected disabled>Ext_Desc</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.FULL_BATH" :options="full_bath" class="sidebar">
                            <option value="null" selected disabled>Full Bath</option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-form-select size="sm" v-model="filters.HALF_BATH" :options="half_bath" class="sidebar">
                            <option value="null" selected disabled>Half Bath</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.BSMT_DESC" :options="bsmt_desc" class="sidebar">
                            <option value="null" selected disabled>Basement</option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-form-select size="sm" v-model="filters.ATTIC_DESC" :options="attic_desc" class="sidebar">
                            <option value="null" selected disabled>Attic</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>

                <b-row v-if="$store.state.file">
                    <b-col>
                        <b-form-select size="sm" v-model="filters.AC" :options="ac" class="sidebar">
                            <option value="null" selected disabled>AC</option>
                        </b-form-select>
                    </b-col>

                    <b-col>
                        <b-form-select size="sm" v-model="filters.FIREPLACE" :options="fireplace" class="sidebar">
                            <option value="null" selected disabled>Fireplace</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <br>











                <b-row>
                    <b-col>
                        <h3 v-if="!this.$store.state.file">Please upload a CSV file.</h3>
                    </b-col>
                    
                </b-row>
            </b-col>

            <b-col cols="12" md="6">
                <GmapMap
                    :center="{lat:41.9, lng:-87.67}"
                    :zoom="13"
                    map-type-id="terrain"
                    style="width: 100%; height: 90vh;"
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

        <br>
        
        <b-col cols="12" style="position: fixed; bottom: 0;">
            <h6><a href="https://github.com/baldmike/filtered-google-maps">VIEW CODE</a></h6>
        </b-col>
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
                filters: {
                    address: null,
                    Zip: null,
                    REC_TYPE: null,
                    PIN: null,
                    OVACLS: null,
                    CLASS_DESCRIPTION: null,
                    TOWN: null,
                    VOLUME: null,
                    LOC: null,
                    TAX_CODE: null,
                    NEIGHBORHOOD: null,
                    RES_TYPE: null,
                    BLDG_USE: null,
                    APT_DESC: null,
                    COMM_UNITS: null,
                    EXT_DESC: null,
                    FULL_BATH: null,
                    HALF_BATH: null,
                    BSMT_DESC: null,
                    ATTIC_DESC: null,
                    AC: null,
                    FIREPLACE: null,

                    minimumMarketValue: null,
                    maximumMarketValue: null,
                    minimumCurrentLandValue: null,
                    maximumCurrentLandValue: null,
                    minimumCurrentBuildingValue: null,
                    maximumCurrentBuildingValue: null,
                    minimumCurrentTotalValue: null,
                    maximumCurrentTotalValue: null,
                    minimumPriorLandValue: null,
                    maximumPriorLandValue: null,
                    minimumPriorBuildingValue: null,
                    maximumPriorBuildingValue: null,
                    minimumPriorTotalValue: null,
                    maximumPriorTotalValue: null,
                    
                    
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
                this.applyFilters = false;
                
                let nowClearThis = this.filters;

                for (let key in nowClearThis) {
                    if (nowClearThis.hasOwnProperty(key)) {
                        nowClearThis[key] = null;
                    }
                }
            },
            icon(m) {
                let value = m.data["ESTIMATED_MARKET_VALUE"];
                
                // REFACTOR ME!
                if(parseInt(value) < 400000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|00FF00|000000`
                }

                if(parseInt(value) < 500000 && parseInt(value) > 400000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FF4900|000000`
                }

                if(parseInt(value) < 600000 && parseInt(value) > 500000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FFA200|000000`
                }

                if(parseInt(value) < 700000 && parseInt(value) > 600000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FFE400|000000`
                }

                if(parseInt(value) < 800000 && parseInt(value) > 700000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|C9FF00|000000`
                }

                if(parseInt(value) < 900000 && parseInt(value) > 800000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|93FF00|000000`
                }

                if(parseInt(value) > 1000000){
                    return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|33cc33|000000`
                }

                return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=o|FF0000|000000`
            },
        },

        computed: {
            filteredMarkers() {
                let self=this;

                if(!this.applyFilters){
                    this.filteredResults = this.$store.state.file;
                }
                
                if(this.filters.address){
                    this.filteredResults = this.filteredResults.filter(item => item.data["Full_Address"].toLowerCase().indexOf(self.filters.address.toLowerCase())>=0);
                }

                if(this.filters.Zip){
                    this.filteredResults = this.filteredResults.filter(item => item.data["Zip"] == self.filters.Zip);
                }

                if(this.filters.REC_TYPE){
                    this.filteredResults = this.filteredResults.filter(item => item.data["REC_TYPE"] == self.filters.REC_TYPE);
                }

                if(this.filters.PIN){
                    this.filteredResults = this.filteredResults.filter(item => item.data["PIN"].toString() == self.filters.PIN);
                }

                if(this.filters.OVACLS){
                    this.filteredResults = this.filteredResults.filter(item => item.data["OVACLS"] == self.filters.OVACLS);
                }

                if(this.filters.CLASS_DESCRIPTION){
                    this.filteredResults = this.filteredResults.filter(item => item.data["CLASS_DESCRIPTION"] == self.filters.CLASS_DESCRIPTION);
                }

                if(this.filters.minimumCurrentLandValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["CURRENT_LAND"]) >= self.filters.minimumCurrentLandValue)
                }

                if(this.filters.maximumCurrentLandValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["CURRENT_LAND"]) <= self.filters.maximumCurrentLandValue);
                }

                if(this.filters.minimumCurrentBuildingValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["CURRENT_BUILDING"]) >= self.filters.minimumCurrentBuildingValue)
                }

                if(this.filters.maximumCurrentBuildingValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["CURRENT_BUILDING"]) <= self.filters.maximumCurrentBuildingValue);
                }
                
                if(this.filters.minimumCurrentTotalValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["CURRENT_TOTAL"]) >= self.filters.minimumCurrentTotalValue)
                }

                if(this.filters.maximumCurrentTotalValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["CURRENT_TOTAL"]) <= self.filters.maximumCurrentTotalValue);
                }

                if(this.filters.minimumMarketValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["ESTIMATED_MARKET_VALUE"]) >= self.filters.minimumMarketValue)
                }

                if(this.filters.maximumMarketValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["ESTIMATED_MARKET_VALUE"]) <= self.filters.maximumMarketValue);
                }
                
                if(this.filters.minimumPriorLandValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["PRIOR_LAND"]) >= self.filters.minimumPriorLandValue)
                }

                if(this.filters.maximumPriorLandValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["PRIOR_LAND"]) <= self.filters.maximumPriorLandValue);
                }

                if(this.filters.minimumPriorBuildingValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["PRIOR_BUILDING"]) >= self.filters.minimumPriorBuildingValue)
                }

                if(this.filters.maximumPriorBuildingValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["PRIOR_BUILDING"]) <= self.filters.maximumPriorBuildingValue);
                }
                
                if(this.filters.minimumPriorTotalValue){
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["PRIOR_TOTAL"]) >= self.filters.minimumPriorTotalValue)
                }

                if(this.filters.maximumPriorTotalValue) {
                    this.filteredResults = this.filteredResults.filter(item => parseInt(item.data["PRIOR_TOTAL"]) <= self.filters.maximumCurrentTotalValue);
                } 

                if(this.filters.VOLUME){
                    this.filteredResults = this.filteredResults.filter(item => item.data["VOLUME"] == self.filters.VOLUME);
                }

                if(this.filters.TAX_CODE){
                    this.filteredResults = this.filteredResults.filter(item => item.data["TAX_CODE"] == self.filters.TAX_CODE);
                }

                if(this.filters.NEIGHBORHOOD){
                    this.filteredResults = this.filteredResults.filter(item => item.data["NEIGHBORHOOD"] == self.filters.NEIGHBORHOOD);
                }

                if(this.filters.RES_TYPE){
                    this.filteredResults = this.filteredResults.filter(item => item.data["RES_TYPE"] == self.filters.RES_TYPE);
                }

                if(this.filters.BLDG_USE){
                    this.filteredResults = this.filteredResults.filter(item => item.data["BLDG_USE"] == self.filters.BLDG_USE);
                }

                if(this.filters.APT_DESC){
                    this.filteredResults = this.filteredResults.filter(item => item.data["APT_DESC"] == self.filters.APT_DESC);
                }

                if(this.filters.COMM_UNITS){
                    this.filteredResults = this.filteredResults.filter(item => item.data["COMM_UNITS"] == self.filters.COMM_UNITS);
                }

                if(this.filters.EXT_DESC){
                    this.filteredResults = this.filteredResults.filter(item => item.data["EXT_DESC"] == self.filters.EXT_DESC);
                }

                if(this.filters.FULL_BATH){
                    this.filteredResults = this.filteredResults.filter(item => item.data["FULL_BATH"] == self.filters.FULL_BATH);
                }

                if(this.filters.HALF_BATH){
                    this.filteredResults = this.filteredResults.filter(item => item.data["HALF_BATH"] == self.filters.HALF_BATH);
                }

                if(this.filters.BSMT_DESC){
                    this.filteredResults = this.filteredResults.filter(item => item.data["BSMT_DESC"] == self.filters.BSMT_DESC);
                }

                if(this.filters.ATTIC_DESC){
                    this.filteredResults = this.filteredResults.filter(item => item.data["ATTIC_DESC"] == self.filters.ATTIC_DESC);
                }

                if(this.filters.AC){
                    this.filteredResults = this.filteredResults.filter(item => item.data["AC"] == self.filters.AC);
                }

                if(this.filters.FIREPLACE){
                    this.filteredResults = this.filteredResults.filter(item => item.data["FIREPLACE"] == self.filters.FIREPLACE);
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

            // create each select options
            zip() {
                
                let homes = this.$store.state.file;
                let zipArray = new Array();

                homes.forEach(object => {
                    
                    // grab the zip code
                    let zip = parseInt(object['data']['Zip'], 10);
                    
                    // if it's not in the array, push it real good
                    if (zipArray.indexOf(zip) === -1) {
                        zipArray.push(zip)
                    }
                });
                return zipArray;
            },

            rec_type() {
                
                let homes = this.$store.state.file;
                let rec_typeArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let rec_type = object['data']['REC_TYPE'];
                    
                    // if it's not in the array, push it in
                    if (rec_typeArray.indexOf(rec_type) === -1) {
                        rec_typeArray.push(rec_type)
                    }
                });
                return rec_typeArray;
            },

            pin() {
                
                let homes = this.$store.state.file;
                let pinArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let pin = object['data']['PIN'];
                    
                    // if it's not in the array, push it right in
                    if (pinArray.indexOf(pin) === -1) {
                        pinArray.push(pin)
                    }
                });
                return pinArray;
            },

            ovacls() {
                
                let homes = this.$store.state.file;
                let ovaclsArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let ovacls = parseInt(object['data']['OVACLS'], 10);
                    
                    // if it's not in the array, go ahead, push it in
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

            town() {
                
                let homes = this.$store.state.file;
                let townArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let town = object['data']['TOWN'];
                    
                    // if it's not in the array, push it in
                    if (townArray.indexOf(town) === -1) {
                        townArray.push(town)
                    }
                });
                return townArray;
            },

            volume() {
                
                let homes = this.$store.state.file;
                let volumeArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let volume = object['data']['VOLUME'];
                    
                    // if it's not in the array, push it in
                    if (volumeArray.indexOf(volume) === -1) {
                        volumeArray.push(volume)
                    }
                });
                return volumeArray.sort((a, b) => a - b);
            },

            loc() {
                
                let homes = this.$store.state.file;
                let locArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let loc = object['data']['LOC'];
                    
                    // if it's not in the array, push it in
                    if (locArray.indexOf(loc) === -1) {
                        locArray.push(loc)
                    }
                });
                return locArray;
            },

            tax_code() {
                
                let homes = this.$store.state.file;
                let tax_codeArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let tax_code = object['data']['TAX_CODE'];
                    
                    // if it's not in the array, push it in
                    if (tax_codeArray.indexOf(tax_code) === -1) {
                        tax_codeArray.push(tax_code)
                    }
                });
                return tax_codeArray.sort((a, b) => a - b);
            },

            neighborhood() {

                let homes = this.$store.state.file;
                let neighborhoodArray = new Array();

                homes.forEach(object => {
                    
                    // grab the hood
                    let neighborhood = object['data']['NEIGHBORHOOD'];
                    
                    // if it's not in the array, push the hood on in
                    if (neighborhoodArray.indexOf(neighborhood) === -1) {
                        neighborhoodArray.push(neighborhood)
                    }
                });
                return neighborhoodArray.sort((a, b) => a - b);  
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
                return resTypeArray.sort();
            },

            bldg_use() {

                let homes = this.$store.state.file;
                let bldg_useArray = new Array();

                homes.forEach(object => {
                    
                    // grab the hood
                    let bldg_use = object['data']['BLDG_USE'];
                    
                    // if it's not in the array, push the hood on in
                    if (bldg_useArray.indexOf(bldg_use) === -1) {
                        bldg_useArray.push(bldg_use)
                    }
                });
                return bldg_useArray.sort();  
            },
            
            apt_desc() {
                
                let homes = this.$store.state.file;
                let apt_descArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let apt_desc = object['data']['APT_DESC'];
                    
                    // if it's not in the array, push it in
                    if (apt_desc && apt_descArray.indexOf(apt_desc) === -1) {
                        apt_descArray.push(apt_desc)
                    }
                });
                return apt_descArray;
            },

            comm_units() {

                let homes = this.$store.state.file;
                let comm_unitsArray = new Array();

                homes.forEach(object => {
                    
                    // grab the hood
                    let comm_units = object['data']['COMM_UNITS'];
                    
                    // if it's not in the array, push the hood on in
                    if (comm_units && comm_unitsArray.indexOf(comm_units) === -1) {
                        comm_unitsArray.push(comm_units)
                    }
                });
                return comm_unitsArray;  
            },
            
            ext_desc() {
                
                let homes = this.$store.state.file;
                let ext_descArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let ext_desc = object['data']['EXT_DESC'];
                    
                    // if it's not in the array, push it in
                    if (ext_desc && ext_descArray.indexOf(ext_desc) === -1) {
                        ext_descArray.push(ext_desc)
                    }
                });
                return ext_descArray;
            },

            full_bath() {

                let homes = this.$store.state.file;
                let full_bathArray = new Array();

                homes.forEach(object => {
                    
                    // grab the hood
                    let full_bath = object['data']['FULL_BATH'];
                    
                    // if it's not in the array, push the hood on in
                    if (full_bath && full_bathArray.indexOf(full_bath) === -1) {
                        full_bathArray.push(full_bath)
                    }
                });
                return full_bathArray;  
            },
            
            half_bath() {
                
                let homes = this.$store.state.file;
                let half_bathArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let half_bath = object['data']['HALF_BATH'];
                    
                    // if it's not in the array, push it in
                    if (half_bath && half_bathArray.indexOf(half_bath) === -1) {
                        half_bathArray.push(half_bath)
                    }
                });
                return half_bathArray;
            },

            bsmt_desc() {

                let homes = this.$store.state.file;
                let bsmt_descArray = new Array();

                homes.forEach(object => {
                    
                    // grab the hood
                    let bsmt_desc = object['data']['BSMT_DESC'];
                    
                    // if it's not in the array, push the hood on in
                    if (bsmt_desc && bsmt_descArray.indexOf(bsmt_desc) === -1) {
                        bsmt_descArray.push(bsmt_desc)
                    }
                });
                return bsmt_descArray;  
            },
            
            attic_desc() {
                
                let homes = this.$store.state.file;
                let attic_descArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let attic_desc = object['data']['ATTIC_DESC'];
                    
                    // if it's not in the array, push it in
                    if (attic_desc && attic_descArray.indexOf(attic_desc) === -1) {
                        attic_descArray.push(attic_desc)
                    }
                });
                return attic_descArray;
            },

            ac() {

                let homes = this.$store.state.file;
                let acArray = new Array();

                homes.forEach(object => {
                    
                    // grab the hood
                    let ac = object['data']['AC'];
                    
                    // if it's not in the array, push the hood on in
                    if (ac && acArray.indexOf(ac) === -1) {
                        acArray.push(ac)
                    }
                });
                return acArray;  
            },
            
            fireplace() {
                
                let homes = this.$store.state.file;
                let fireplaceArray = new Array();

                homes.forEach(object => {
                    
                    // grab it
                    let fireplace = object['data']['FIREPLACE'];
                    
                    // if it's not in the array, push it in
                    if (fireplace && fireplaceArray.indexOf(fireplace) === -1) {
                        fireplaceArray.push(fireplace)
                    }
                });
                return fireplaceArray.sort((a, b) => a - b);
            },
        },
    }
</script>

<style>
    #app {
        background-color: lightgrey;
        min-height: 100vh;
    }
</style>
