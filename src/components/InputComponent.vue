<template>
    <div class="container">
        <b-form-file
            v-model="csvFile"
            :state="Boolean(csvFile)"
            placeholder="Select CSV file"
            drop-placeholder="Drop file here..."
            @change="onFileChange"/>

        
        <div v-for="value in $store.state.file" v-bind:key="value[0]">
                {{ value["Full Address"] }}
        </div>
        
    </div>
</template>

<script>

    import Papa from 'papaparse'

    export default {
        name: "input-component",
        
        data() {
            return {
                csvFile: null
            }
        },
        
        methods: {
            onFileChange(e) {

                const self = this
                
                const fileToLoad = event.target.files[0]

                const reader = new FileReader()

                reader.onload = fileLoadedEvent => {
                    Papa.parse(fileLoadedEvent.target.result, {
                        header: true,
                        complete (results) {
                            // eslint-disable-next-line no-console

                            self.csvFile = JSON.stringify(results.data, null, 2)

                            self.$store.dispatch('setFile', results.data);

                            let marker = new google.maps.Marker({
                            position: new google.maps.LatLng(self.$store.state.file[0][1], self.$store.state.file[0][2]),
                            map: map
                            });
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
