<template>
    <div class="container-fluid" id="app" >
        <b-row>
            <b-col cols="4" offset="4">
                <input-component/>
            </b-col>
            <b-col cols="12">
                <map-component></map-component>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    import InputComponent from './components/InputComponent.vue'
    import MapComponent from './components/MapComponent.vue'
    
    export default {
        name: 'app',

        components: {
            InputComponent,
            MapComponent
        },

        data() {
            return {

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
        margin-top: 20px;
        font-size: 12px;
    }

</style>


