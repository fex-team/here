angular.module('detail', ['ionic', 'hereApp.controllers'])
.controller('DetailController', function($scope, $stateParams) {
    console.log($stateParams);

    Here.api.get('/api/get_group', {
                    groupId: $stateParams.groupId
                }, {
                    success: function(data){
                        data.photos.forEach(function(photo, index){
                            photo['src'] = Here.serverAddress + '&c=api&a=img&hash=' + photo.hash;
                            photo.commentShow = false;
                        });
                        console.log(data);
                        $scope.group = data;
                        $scope.$apply();
                        angular.element(document.querySelector('#detail-header')).find('h1').html(data.name);
                    },
                    error: function(data){
                        console.log(data);
                    }
                });


    // 显示评论区域
    $scope.showComment = function(){
        var photoId = this.photo.id;


        $scope.group.photos.forEach(function(photo){
            if( photoId === photo.id ){
                if(photo.commentItems == undefined){
                    Here.api.get('/api/get_comments', {
                                    photoId: photoId
                                }, {
                                    success: function(data) {
                                        $scope.group.photos.forEach(function(photo){
                                            if( photoId === photo.id ){
                                                photo.commentItems = data || [];
                                            }
                                        });

                                        $scope.$apply();
                                    },
                                    error: function(data) {
                                      
                                    }
                                });
                }//if

                photo.commentShow = !photo.commentShow;
            }//if
        });
    };

    // 关注照片
    $scope.doFollow = function(){
        //TODO 先判断登录状态
        var photoId = this.photo.id;
        Here.api.post('/api/follow', {
                            'photoId': photoId
                        }, {
                            success: function(data) {
                                $scope.group.photos.forEach(function(photo){
                                    if( photoId === photo.id ){
                                        photo.follows = ++photo.follows;
                                    }
                                });
                                $scope.$apply();
                            },
                            error: function(data) {
                                alert(data.message);
                            }
                        });
    };

})
.controller('CommentController', function($rootScope, $scope, $element){

    $scope.submitComment = function(){
        var photoId = $element.find('input').attr('data-photoId');

        if($scope.commentContent === '' || !$scope.commentContent){
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
                                            nickname: Here.userInfo.nickname,
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
});