(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchResults.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.user =[
            {
                "Name" : "Alfreds Futterkiste",
                "Country" : "Germany"
            },{
            "Name" : "Berglunds snabbköp",
            "Country" : "Sweden"
        },{
            "Name" : "Centro comercial Moctezuma",
            "Country" : "Mexico"
        },{
            "Name" : "Ernst Handel",
            "Country" : "Austria"
        }
        ];
    }
})();

    function myMap() {
        var mapOptions = {
            center: new google.maps.LatLng(51.5, -0.12),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
