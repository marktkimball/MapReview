(function() {
  'use strict';
  angular
    .module('reviews')
    .controller('ReviewsController', function($scope, ReviewsService, $auth, $location){

      var vm = this;

      vm.ratingOptions = [1, 2, 3, 4, 5];

      vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      vm.review = {};

      ReviewsService.getReviews().then(function(reviews){
        vm.reviews = reviews.data;
      });

      vm.getReview = function(coords, review){
        var user = review.user;
        if(vm.review.rating === undefined){
          vm.review.rating = '5';
        };
        vm.review.coords = coords;
        ReviewsService.sendReview(review);
        vm.review = {};
        vm.review.user = user;
        var element = angular.element(document.querySelector('.reviewForm'));
        element.addClass('hide');
        var secondElement = angular.element(document.querySelector('.reviews'));
        secondElement.removeClass('hide');
      }


      vm.cancelPost = function () {
        var element = angular.element(document.querySelector('.reviewForm'));
        element.addClass('hide');
        var secondElement = angular.element(document.querySelector('.reviews'));
        secondElement.removeClass('hide');
      }

      vm.deleteReview = function(id){
        ReviewsService.deleteReview(id);
      }

      vm.isLocationReviews = function() {
        return $location.path() === '/myReviews'
      }

      vm.isLocationHome = function() {
        return $location.path() === '/'
      }

      var watchCallback = function () {
          ReviewsService.getReviews().then(function (reviews) {
            vm.reviews = reviews.data;
          });
        };

      $scope.$on('review:created', watchCallback);
      $scope.$on('review:deleted', watchCallback);
      $scope.$on('review:edited', watchCallback);
    })
    .controller('ReviewModal', function($scope, $modal, $log) {

      $scope.animationsEnabled = true;

      $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modal.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

      $scope.close = function () {
        $modalInstance.close($scope.selected.item);
      };

    });

})();
