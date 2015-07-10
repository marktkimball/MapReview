(function() {
  'use strict';
  angular
    .module('reviews')
    .factory('ReviewsService', function($http, $rootScope) {
      var reviewsUrl = "http://tiy-fee-rest.herokuapp.com/collections/MapReview1"

      var getReviews = function() {
        return $http.get(reviewsUrl).then(function(reviews){
          return reviews;
        })
      };

      var sendReview = function(review){
        $http.post(reviewsUrl, review).success(function(response){
          $rootScope.$broadcast('review:created');
        }).error(function(error){
          console.log("error " + error);
        })
      };

      var deleteReview = function(id){
        $http.delete(reviewsUrl + "/" + id).success(function(response){
          $rootScope.$broadcast('review:deleted');
        }).error(function(error){
          console.log("error " + error);
        })
      }

      var editReview = function(review, id){
        $http.put(reviewsUrl + "/" + id, review).success(function(response){
          $rootScope.$broadcast('review:edited');
        }).error(function(error){
          console.log("error " + error);
        })
      }

      return {
        getReviews: getReviews,
        sendReview: sendReview,
        deleteReview: deleteReview,
        editReview: editReview
      };

    });
})();
