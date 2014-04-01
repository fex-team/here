angular.module('detail', ['ionic', 'hereApp.controllers'])
.controller('DetailController', function($scope, $stateParams, $http) {
    console.log($stateParams);
    $http.get('http://localhost/end/here/here/api/get_group?groupId=' + $stateParams.groupId).
        success(function(response) {
            response.data.photos.forEach(function(photo, index){
                photo['src'] = 'http://localhost/end/here/here/api/img?hash=' + photo.hash;
                photo.commentShow = false;
            });
            console.log(response.data);
            $scope.group = response.data;
            angular.element(document.querySelector('#detail-header')).find('h1').html(response.data.name);
        }).error(function(data, status, headers, config) {
          
        });

    $scope.showComment = function(){
        var photoId = this.photo.id;


        $scope.group.photos.forEach(function(photo){
            if( photoId === photo.id ){
                if(photo.commentItems == undefined){
                    $http.get('http://localhost/end/here/here/api/get_comments?photoId=' + photoId).
                        success(function(response) {
                            $scope.group.photos.forEach(function(photo){
                                if( photoId === photo.id ){
                                    photo.commentItems = response.data || [];
                                }
                            });
                        }).error(function(data, status, headers, config) {
                          
                        });
                }

                photo.commentShow = !photo.commentShow;
            }
        });
    }

})
.controller('CommentController', function($scope, $element, $http){

    $scope.submitComment = function(){
        var photoId = $element.find('input').attr('data-photoId');

        if($scope.commentContent === ''){
            alert('评论内容不能为空！');
            return;
        }

        console.log('图片Id：' + photoId);
        console.log('评论内容：' + $scope.commentContent);

        Here.api.post('/api/comment', {
                            'photoId': photoId,
                            'content': $scope.commentContent
                        }, {
                            success: function(data){
                                $scope.group.photos.forEach(function(photo){
                                    if( photoId === photo.id ){
                                        photo.commentItems.push({
                                            nickname: 'jianling',
                                            content: $scope.commentContent,
                                            time: '刚刚'
                                        });
                                        photo.comments = ++photo.comments;
                                    }
                                });
                                $scope.commentContent = '';
                                $scope.$apply();
                            },
                            error: function(data){
                                alert(data.message);
                            }
                        });

    }
})