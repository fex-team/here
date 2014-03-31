angular.module('detail', ['ionic', 'hereApp.controllers'])
.controller('DetailController', function($scope, $stateParams, $http) {
    console.log($stateParams);
    $http({method: 'GET', url: 'http://localhost/end/here/here/api/get_group?groupId=' + $stateParams.groupId}).
        success(function(response) {
            response.data.photos.forEach(function(photo, index){
                photo['src'] = 'http://localhost/end/here/here/api/img?hash=' + photo.hash;
            });
            console.log(response.data);
            $scope.group = response.data;
            angular.element(document.querySelector('#detail-header')).find('h1').html(response.data.name);
        }).error(function(data, status, headers, config) {
          
        });
});