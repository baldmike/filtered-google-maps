# Filtered-Google-Maps

This is a Google Maps coding challenge. Given a *spoiler alert* (wonky) dataset of 1500 properties in Chicago, build a filterable Google map, place all 1500 on the map with a color gradient of green to red, based on ESTIMATED_MARKET_VALUE, lowest to highest. 

The first challenge is parsing the data from and Excel .xlsx format into JSON. Initially, I achieved this by saving the .xlsx file to a .CSV and then parsing it with 'Papa Parse'. This worked, but was wonky and seemed outside the scope. So, the data is converted to JSON and included in the code.

Another challenge was the number of filters, and how to chain them. That's what Vue is for. I saw two working examples of this, and they both used a "set filters" approach, where the user sets whichever filters they want, and then clicks "Filter".  This misses the point of reactive data, and so a new array of filteredData and multiple computed properties did the trick. Now, the user can select *any* filter, in any order or combination, and the data is filtered live === reactive. You can't use a forEach loop for these computed properties, which initially felt necessary. Computed properties get 'computed' once and then the value is cached until *a dependent variable changes*. If you used a loop, you'd need to go thru each one to change that one updated value. Hence, a bazillion repeated computed properties.

To run locally, follow the steps below, but know that you'll also need your own Google API key (and enable both maps and geocoding) - the one used here is restricted by the great Google itself, which is something you must do with your key. 

Project Demo: https://baldmike.github.io/filtered-google-maps/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
