<template>
    <div class="container-fluid" id="app" >
        <b-row>
            <b-col cols="12">
                <map-component></map-component>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    import MapComponent from './components/MapComponent.vue'
    
    export default {
        name: 'app',

        components: {
            MapComponent
        },

        data() {
            return {

            }
        },

        mounted() {
            
            // set the datafile in the store when app mounts
            this.$store.dispatch('setFile');

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
        margin-top: 20px;
        font-size: 10px;
    }

</style>


