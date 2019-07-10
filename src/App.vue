<template>

    <div id="app">
        <div class="container-fluid">
            <b-row>
                <div class="col-4">
                    <input-component/>
                    
                </div>
                
                <div class="col-8">
                    <gmaps-component/>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>

    import GmapsComponent from './components/GmapsComponent.vue'
    import InputComponent from './components/InputComponent.vue'
    

    export default {
        name: 'app',
        components: {
            GmapsComponent,
            InputComponent,
            
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
