<template>

    <div id="app" >
            <b-row>
                <b-col>
                    <input-component/>

                    <br>
                
                    <GmapMap
                        :center="{lat:42, lng:-88}"
                        :zoom="9"
                        map-type-id="terrain"
                        style="width: 100vw; height: 80vh;"
                        >
                        <GmapMarker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                        />
                    </GmapMap>

                    {{ markers }}

                </b-col>
            </b-row>
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


