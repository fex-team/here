(function() {
	angular.module('person_edit', ['ionic', 'hereApp.controllers','component.openPhoto']).controller('person_edit_header', function($scope, $stateParams,$openPhoto, $state, $ionicPopup,$ionicLoading) {
		$scope.person_edit_ok = [{
			type : 'button ion-ios7-checkmark-outline button-icon icon',
			tap : function(e) {
				
				var user = angular.element(document.querySelectorAll('#person-edit')[0]).scope().user;
				
				console.info(user);

                var postData = {
                    'nickname' : user.nickname,
                    'sex': user.sex ? user.sex : '',
                    'city': (user.city ? user.city : ''),
                    'intro': user.intro,
                    'birthday': user.birthday
                };

                //执行提交
                var doPost = function(){
                    var loading = $ionicLoading.show({
                        content: '保存中...',
                    });
                    Here.api.post('/user/update', postData, {
                        success : function(data) {
                            loading.hide();
                            $state.go('person_detail');
                        },
                        error : function(data) {
                            loading.hide();
                            $ionicPopup.alert({
                                title: '警告',
                                content: data.message
                            });
                        }
                    });
                };

                var avatarImage;

                if( /data:/.test(user.avatar) ){
                    postData.avatar = user.avatar;

                    // 取头像尺寸
                    avatarImage = new Image();
                    avatarImage.onload = function(){
                        postData.avatarSize = avatarImage.width + 'X' + avatarImage.height;
                        doPost();
                    };
                    avatarImage.src = user.avatar;
                }else{
                    doPost();
                }

				
			}
		}];
		
		
	}).controller("person_edit",function($scope, $stateParams, $openPhoto, $ionicPopup){


		
		$scope.cityList = {"b":["北京","北安","白山","白城","本溪","北镇","北票","保定","泊头市","霸州市","滨州","蚌埠","亳州","保山","毕节市","宝鸡","白银","板桥市"],"t":["天津","铁力","同江","通化","洮南市","图们市","铁岭","调兵山","唐山","泰安","滕州","泰州","太仓市","通州市","泰兴市","铜陵","天长","桐城","台州","桐乡市","台山市","铜仁市","天门市","漯河","太原","铜川","天水","台北","台中","台南","桃园市","太保市","台东市"],"s":["上海","双鸭山","绥化","双城","尚志","绥芬河","四平","松原","舒兰市","双辽市","沈阳","石家庄","沙河市","三河市","深州市","苏州","宿迁","宿州","绍兴","上虞市","嵊州市","厦门","三明","石狮市","邵武市","深圳","汕头","韶关","汕尾","四会市","三亚","遂宁","什邡市","邵阳","韶山市","随州","十堰","石首市","松滋市","三门峡","商丘","朔州","商洛","上饶"],"c":["重庆","长春","承德","沧州","昌邑","常州","常熟市","滁州","巢湖","池州","慈溪市","长乐市","潮州","从化市","楚雄市","赤水市","成都","崇州市","长沙","郴州","常德","常宁市","赤壁市","长葛市","长治"],"h":["哈尔滨","鹤岗","黑河","虎林","海林","海伦","桦甸市","珲春市","和龙市","葫芦岛","海城","邯郸","衡水","黄骅市","河间市","菏泽","海阳","淮安","海门市","合肥","淮南","淮北","黄山","杭州","湖州","海宁市","惠州","河源","鹤山市","化州市","海口","华蓥市","衡阳","怀化","洪江市","黄石","黄冈","洪湖市","汉川市","鹤壁","辉县市","河津","侯马","霍州","汉中","韩城市","华阴市","合作市","花莲市"],"d":["大庆","德惠市","大安市","敦化市","大连","丹东","东港","大石桥","灯塔","定州市","东营","德州","东台市","大丰市","丹阳市","东阳市","东莞","儋州","东方","大理市","都匀市","德阳","达州","都江堰市","大冶市","丹江口市","当阳市","登封市","邓州市","大同","定西","敦煌市","德令哈","德兴市","斗六市"],"q":["齐齐哈尔","七台河","秦皇岛","迁安市","青岛","栖霞","青州","曲阜","启东市","衢州","泉州","清远","琼海","曲靖","清镇市","邛崃市","潜江市","沁阳市","庆阳"],"j":["佳木斯","鸡西","吉林","九台市","蛟河市","集安市","锦州","晋州市","冀州市","济南","济宁","胶南","胶州","即墨","江阴市","金坛市","江都市","句容市","姜堰市","靖江市","界首","嘉兴","金华","建德市","江山市","晋江市","建瓯市","建阳市","揭阳","江门","景洪市","江油市","简阳市","津市市","吉首市","荆州","荆门","焦作","济源市","晋城","晋中","介休","酒泉","嘉峪关","金昌","九江","吉安","景德镇","井冈山市","基隆","嘉义"],"m":["牡丹江","密山","穆林","梅河口市","马鞍山","明光","茂名","梅州","绵阳","眉山","绵竹市","汨罗市","麻城市","孟州市","苗栗市","马公市"],"y":["伊春","榆树市","延吉市","营口","烟台","兖州","禹城","盐城","扬州","宜兴市","仪征市","扬中市","余姚市","义乌市","永康市","永安市","阳江","云浮","阳春市","英德市","玉溪","宜宾","雅安","岳阳","永州","益阳","沅江市","宜昌","宜都市","宜城市","应城市","偃师市","禹州市","义马市","永城市","阳泉","运城","永济","原平","延安","榆林","玉门市","鹰潭","宜春","宜兰市"],"n":["纳河","宁安","南宫市","南京","南通","宁国","宁波","南平","宁德","南安市","南雄市","南充","内江","南阳","南昌","南康市","南投市"],"f":["富锦","抚顺","阜新","凤城","阜阳","富阳市","奉化市","福州","福清市","福安市","福鼎市","佛山","福泉市","汾阳","抚州","丰城市","丰原市","凤山市"],"w":["五大连池","瓦房店","武安市","潍坊","威海","文登","无锡","吴江市","芜湖","温州","温岭市","武夷山","文昌","万宁","五指山","万源市","武冈市","武汉","武穴市","舞钢市","卫辉市","渭南","武威"],"z":["肇东","朝阳","庄河","张家口","遵化市","涿州市","淄博","枣庄","章丘","招远","诸城","邹城","镇江","张家港市","舟山","诸暨市","漳州","漳平市","珠海","湛江","肇庆","中山","增城市","昭通","遵义","自贡","资阳","株洲","张家界","资兴市","枝江市","枣阳市","钟祥市","郑州","周口","驻马店","张掖","樟树市","竹北市","彰化市"],"a":["安达","鞍山","安国市","安丘","安庆","安宁市","安顺","安陆市","安阳","安康"],"l":["辽源","临江市","龙井市","辽阳","凌海","凌源","廊坊","鹿泉市","莱芜","临沂","聊城","莱西","龙口","莱阳","莱州","乐陵","临清","连云港","溧阳市","丽水","临安市","乐清市","兰溪市","临海市","龙泉市","龙岩","龙海市","乐昌市","廉江市","雷州市 吴川市","陆丰市","连州市","罗定市","丽江","临沧","潞西市","六盘水","乐山","泸州","阆中市","娄底","浏阳市","醴陵市","耒阳市","临湘市","冷水江市","涟源市","老河口市","利川市","洛阳","林州市","灵宝市","临汾","吕梁","潞城","兰州","陇南","临夏市","乐平市"],"p":["磐石市","盘锦","普兰","平度","蓬莱","邳州市","平湖市","莆田","普宁市","普洱","攀枝花","彭州市","平顶山","濮阳","平凉","萍乡","屏东市"],"g":["公主岭市","盖州","藁城市","高碑店市","高密","高邮市","广州","高州市","高要市","个旧市","贵阳","广元","广安","广汉市","广水市","巩义市","古交","高平","格尔木","赣州","贵溪市","高安市","高雄"],"x":["新民","兴城","邢台","辛集市","新乐市","徐州","新沂市","兴化市","宣城","兴宁市","宣威市","兴义市","西昌市","湘潭","湘乡市","襄樊","孝感","咸宁","仙桃市","新乡","信阳","许昌","新郑市","新密市","荥阳市","项城市","忻州","孝义","西安","咸阳","兴平市","西宁","新余","新竹","新营市"],"k":["开原","昆山市","开平市","昆明","开远市","凯里市","开封"],"r":["任丘市","日照","乳山","荣成","如皋市","瑞安市","瑞丽市","仁怀市","汝州市","瑞昌市","瑞金市"],"e":["恩平市","峨眉山市","鄂州","恩施市"]};
		
		$scope.openPhoto = function() {
			$openPhoto.show({
				targetWidth : 180,
				targetHeight : 180,
				allowEdit : true,
				quality : 80
			}, {
				onsuccess : function(file) {
					$scope.user.avatar = "data:image/jpeg;base64," + file;
					$scope.$apply();
				},
				onerror : function(file) {
					
				}
			});
		}
		

		$scope.user = {
			username: '',
			nickname: '',
			sex: '男',
			city: '北京',
			intro: '',
			birthday: '',
			time: ''
		};

	
		

        $scope.updateUserInfo = function(data){
            $scope.user.username = data.username;
            $scope.user.nickname = data.nickname;
            $scope.user.sex = data.sex;
            $scope.user.city = data.city;
            $scope.user.birthday = data.birthday;
            $scope.user.intro = data.intro;
            $scope.user.time = data.time.split(' ')[0];


            if (data.avatar.length > 0){
                $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=' + data.avatar;
            }else{
                $scope.user.avatar = Here.serverAddress + '&c=api&a=img&hash=/avatar.jpg';
            }
        }


        if( localStorage.getItem('here_userInfo') ){
            $scope.updateUserInfo( JSON.parse(localStorage.getItem('here_userInfo')) );
        }

        if( Here.isLogin ){
            Here.api.get('/api/get_user', {
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
        }else{
            $ionicPopup.alert({
                title: '警告',
                content: '登录后才可编辑'
            }).then(function(res) {
                location.href = "#/login?referer=" + encodeURIComponent(location.hash);
            });
        }
	});
})();
