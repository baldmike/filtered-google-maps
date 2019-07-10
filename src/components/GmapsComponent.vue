<template>
    <div class="the-map"/>
</template>

<script>

import gmapsInit from '../utils/gmaps';
import MarkerClusterer from '@google/markerclusterer';

export default {
    name: 'gmapsComponent',

    async mounted() {
        try {
            const google = await gmapsInit();
            const geocoder = new google.maps.Geocoder();
            const map = new google.maps.Map(this.$el);
            
            const locations = [{
    
                position: {
                    lat: 48.160910,
                    lng: 16.383330,
                },
            },
            {
                position: {
                    lat: 48.174270,
                    lng: 16.329620,
                },
            }];

            geocoder.geocode({ address: 'Austria' }, (results, status) => {
                if (status !== 'OK' || !results[0]) {
                    throw new Error(status);
                }

                map.setCenter(results[0].geometry.location);
                map.fitBounds(results[0].geometry.viewport);
            });

            const markerClickHandler = (marker) => {
                map.setZoom(13);
                map.setCenter(marker.getPosition());
            };

            const markers = locations.map((location) => {
                const marker = new google.maps.Marker({ ...location, map });

                marker.addListener('click', () => markerClickHandler(marker));

                return marker;
            });
            
            new MarkerClusterer(map, markers, {
            
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            
            })

        } 	catch (error) {
            
            // eslint-disable-next-line
            console.error(error);

        }
    },
};

</script>

<style>

html,
body {
    margin: 0;
    padding: 0;
}

.the-map {
    width: 100%;
    height: 100vh;
}
</style>
