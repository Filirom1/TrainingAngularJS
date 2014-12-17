(function () {
    "use strict";

    /** Product detail view controller */
    angular.module('app')
        .controller('DetailController', ['$scope', '$location', '$routeParams', 'catalogService', 'ProductUtils',
            function ($scope, $location, $routeParams, catalogService, productUtils) {

            $scope.product = {};

            catalogService.getProduct($routeParams.id).success(function (result) {
                $scope.product = result;
            });

            $scope.quantity = 1;

            $scope.getImage = productUtils.getImage;

            /** Returns the CSS class for the average rating of a given product. */
            $scope.getCSSRating = productUtils.getRatingCss;

        }]);
})();
