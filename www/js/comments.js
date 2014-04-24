angular.module('comment', ['ionic', 'hereApp.controllers'])
.controller('ReceivedCommentsController', function($rootScope, $scope, $element, $ionicPopup) {
    $scope.comments = [];
    $scope.element = $element;

    Here.api.get('/api/get_received_comments', {}, {
        success : function(data) {
            $scope.element.find('loading').remove();

            data.forEach(function(comment){
                comment.src = Here.serverAddress + '&c=api&a=img&hash=' + comment.hash ;
            });

            $scope.comments = data;
            $scope.$apply();
        },
        error : function(data) {
            $scope.element.find('loading').remove();
            $scope.comments = null;
        }
    });
}).controller('CommentsController', function($rootScope, $scope, $element, $ionicPopup) {
    $scope.comments = [];
    $scope.element = $element;
    $scope.user = Here.userInfo.nickname;

    Here.api.get('/api/get_comments_by_user', {}, {
        success : function(data) {
            $scope.element.find('loading').remove();

            data.forEach(function(comment){
                comment.src = Here.serverAddress + '&c=api&a=img&hash=' + comment.hash ;
            });

            $scope.comments = data;
            $scope.$apply();
        },
        error : function(data) {
            $scope.element.find('loading').remove();
            $scope.comments = null;
        }
    });
});