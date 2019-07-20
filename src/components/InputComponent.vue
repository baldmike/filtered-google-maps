<template>
    <div class="container">
        <b-form-file
            :state="Boolean($store.state.file)"
            placeholder="Select CSV file"
            @change="onFileChange"/>

        <b-row class="instructions">
            <b-col>
                <p>Select any .csv file with 'Latitude' and 'Longitude'</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    import Papa from 'papaparse'

    export default {
        name: "input-component",
        
        data() {
            return {
                // csvFile: null
            }
        },
        
        methods: {
            onFileChange() {

                const self = this
                
                const fileToLoad = event.target.files[0]

                const reader = new FileReader()

                reader.onload = fileLoadedEvent => {
                    Papa.parse(fileLoadedEvent.target.result, {
                        header: true,
                        complete (results) {
                            // eslint-disable-next-line no-console


                            let homeMarkers = new Array();
                            
                            // pull the lat/lon out and make 'position' and 'data' objects for marker
                            results.data.forEach(row => {
                                let lat = parseFloat(row['Latitude']);
                                let lon = parseFloat(row['Longitude']);
                                let latlon = {position: {'lat':lat, 'lng': lon}, data: row };
                                homeMarkers.push(latlon);
                            });

                            self.$store.dispatch('setFile', homeMarkers);
                        },
                        error (errors) {
                            // eslint-disable-next-line no-console
                            console.log('error', errors)
                        }
                    })
                }
                reader.readAsText(fileToLoad)

                // NO NOT REMOVE -- PAPA PARSE'S DEFAULTS
                // Papa.parse(file, {
                //     delimiter: "",	// auto-detect
                //     newline: "",	// auto-detect
                //     quoteChar: '"',
                //     escapeChar: '"',
                //     header: false,
                //     transformHeader: undefined,
                //     dynamicTyping: false,
                //     preview: 0,
                //     encoding: "",
                //     worker: false,
                //     comments: false,
                //     step: undefined,
                //     complete: undefined,
                //     error: undefined,
                //     download: false,
                //     downloadRequestHeaders: undefined,
                //     skipEmptyLines: false,
                //     chunk: undefined,
                //     fastMode: undefined,
                //     beforeFirstChunk: undefined,
                //     withCredentials: undefined,
                //     transform: undefined,
                //     delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
                // })
            },
        }
    }
</script>

<style scoped>

</style>
