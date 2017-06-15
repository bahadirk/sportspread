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
