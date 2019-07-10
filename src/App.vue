<template>

    <div id="app">
        <b-container-fluid>
            <b-row>
                <div class="col-4">
                    <input-component/>
                    <filter-component/>
                </div>
                
                <div class="col-8">
                    <gmaps-component/>
                </div>
            </b-row>
        </b-container-fluid>
    </div>
</template>

<script>

import GmapsComponent from './components/GmapsComponent.vue'
import InputComponent from './components/InputComponent.vue'
import FilterComponent from './components/FilterComponent.vue'

export default {
name: 'app',
components: {
GmapsComponent,
InputComponent,
FilterComponent

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
