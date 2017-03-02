'use strict';

angular.module('myApp.view1', ['ngRoute', 'leaflet-directive'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.constant('MARKERS', { 'NUM_COUPLES': 3, 'NUM_RELETED_MARKERS': 2 })

.controller('View1Ctrl', ['$scope', 'MARKERS', function($scope, MARKERS) {
    // Number of couples markers
    var numberCouplesMarkers = MARKERS.NUM_COUPLES;
    // Number of related markers
    var numberRelatedMarkers = MARKERS.NUM_RELETED_MARKERS;
    // Moscow sity by center
    var latitude = 55.74;
    var longitude = 37.61;
    // Variables for generating coordinates
    var randomLatitude = [];
    var randomLongitude = [];
    var markers = {};
    var decorations = {};
    var coordinates = [];
    var marker1 = 0;
    var marker2 = numberRelatedMarkers;
    // Add svg icon for the marker
    var svgIcon = "../../images/marker.svg";

    // Number of related markers
    for (var i = 0; i < numberCouplesMarkers * numberRelatedMarkers; i++) {
        // Random coordinates
        randomLatitude[i] = Math.random() + Math.trunc(latitude);
        randomLongitude[i] = Math.random() + Math.trunc(longitude);

        // Keys and parameters for markers
        markers["m" + i] = {
            lat: randomLatitude[i],
            lng: randomLongitude[i],
            icon: {
                iconUrl: svgIcon,
                iconSize: [60, 60]
            },
            message: "Маркер " + i,
            focus: false,
            iconAngle: 0 // rotation icon
        };

        // Add coordinates for array
        coordinates.push([randomLatitude[i], randomLongitude[i]]);
    }

    // Coordinates for dashes between markers
    for (var j = 0; j < numberCouplesMarkers; j++) {
        decorations["m" + j] = {
            coordinates: coordinates.slice(marker1, marker2),
            patterns: [{
                offset: 5,
                repeat: 25,
                symbol: L.Symbol.dash({ pixelSize: 12, pathOptions: { color: '#a900ff', weight: 3 } })
            }]
        };
        marker1 += numberRelatedMarkers;
        marker2 += numberRelatedMarkers;
    }

    angular.extend($scope, {
        moscow: { // Moscow sity by center  
            lat: latitude,
            lng: longitude,
            zoom: 8
        },
        markers: markers, // Markers       
        decorations: decorations // Dashes
    });
}]);