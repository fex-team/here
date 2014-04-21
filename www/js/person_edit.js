(function() {
	angular.module('person_edit', ['ionic', 'hereApp.controllers','component.openPhoto']).controller('person_edit_header', function($scope, $stateParams,$openPhoto, $state) {
		$scope.person_edit_ok = [{
			type : 'button ion-ios7-checkmark-outline button-icon icon',
			tap : function(e) {
				var user = angular.element(document.querySelectorAll('#person-edit')[0]).scope().user;

				Here.api.post('/user/update', {
					'nickname' : user.nickname,
					'sex': user.sex ? user.sex.name : '',
					'address': (user.province ? user.province.name : '') + '|' + (user.city ? user.city.name : ''),
					'intro': user.intro
				}, {
					success : function(data) {
						$state.go('person_detail');
					},
					error : function(data) {
						alert(data.message);
					}
				});
			}
		}];
		
	}).controller("person_edit",function($scope, $stateParams,$openPhoto){
		$scope.openPhoto = function() {
			$openPhoto.show({
				targetWidth : 180,
				targetHeight : 180,
				allowEdit : true,
				quality : 80
			}, {
				onsuccess : function(file) {
					//这里写上传服务器
					$scope.user.photo = "data:image/jpeg;base64," + file;
					$scope.$apply();
				},
				onerror : function(file) {
					alert(file);
				}
			});
		}
		

		$scope.user = {
			username: '',
			nickname: '',
			sex: {name: ''},
			address: '',
			intro: '',
			birthday: '',
			time: ''
		};

		$scope.sexs = [{
			name: '男'
		}, {
			name: '女'
		}];

		$scope.provinces = [{
			name: '北京市',
			citys: [{
				name: '海淀区'
			}, {
				name: '东城区'	
			}, {
				name: '西城区'	
			}]
		}, {
			name: '天津市',
			citys: [{
				name: '河东区'
			}, {
				name: '河西区'	
			}, {
				name: '滨海区'	
			}]
		}, {
			name: '江苏省',
			citys: [{
				name: '南京市'
			}, {
				name: '南通市'	
			}, {
				name: '苏州市'	
			}]
		}, {
			name: '上海市',
			citys: [{
				name: '普陀区'
			}, {
				name: '浦东区'	
			}, {
				name: '静安区'	
			}]
		}];


		$scope.$watch('user.province', function(value){
			$scope.user.city = '';
		});

        $scope.updateUserInfo = function(userData){
            $scope.user.username = userData.username;
            $scope.user.nickname = userData.nickname;

            $scope.sexs.forEach(function( sex, index ){
                if(sex.name == userData.sex){
                    $scope.user.sex = $scope.sexs[index];
                }
            });

            $scope.provinces.forEach(function( province, index ){
                if(province.name == userData.address.split('|')[0]){
                    $scope.user.province = $scope.provinces[index];
                }
            });

            $scope.user.province && $scope.user.province.citys.forEach(function( city, index ){
                if(city.name == userData.address.split('|')[1]){
                    $scope.user.city = $scope.user.province.citys[index];
                }
            });

            $scope.user.address = userData.address;
            $scope.user.intro = userData.intro;
            $scope.user.time = userData.time.split(' ')[0];


            if (userData.avatar.length > 0){
                $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + userData.avatar;
            }else{
                $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
            }
        }


        if( localStorage.getItem('here_userInfo') ){
            $scope.updateUserInfo( JSON.parse(localStorage.getItem('here_userInfo')) );
        }

        Here.isLogin && Here.api.get('/api/get_user', {
            username : Here.userInfo.username
        }, {
            success : function(data) {
                $scope.updateUserInfo(data);
                $scope.$apply();
                localStorage.setItem( 'here_userInfo', JSON.stringify(data) );
            },
            error : function(data) {

            }
        });
	});
})();
