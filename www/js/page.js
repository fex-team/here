(function() {
	angular.module('page', ['ionic', 'hereApp.controllers', 'component.openPhoto']).controller('pageController', function($location,shareDialogAPI, $ionicActionSheet, $rootScope, $scope, $openPhoto, $stateParams, $controller) {

		$scope.pblishButton = [{
			type : ' ion-ios7-checkmark-outline button-icon ',
			tap : function(e) {
				$scope.onPublish();
			}
		}];
		
		$scope.onPublish = function(){
			console.info(this);
			$scope.switchTab("comment");
			$scope.commentList = [{id : "123",
									name : "comment",
									content : this.theme.pblishContent,
									photo : "img/1.png",
									time : "05-03 23:33"}].concat($scope.commentList);
			
			this.theme.pblishContent = "";
			
			history.back();
			setTimeout(function(){
				$scrollEl.scrollTop(342);
				
			},50);
			
		}
		
		window.onpopstate = function() {
			
			if (/^\#\/page[^_]/.test(location.hash)) {
				$scope.showPblish = false;
				$scope.showPage = true;
				$scope.$apply();
			}
		}
		
		$scope.switchPblish = function(){
			$location.hash("page_pblish");
			$scope.showPblish = true;
			$scope.showPage = false;
			
		}

		$scope.openShare = function() {

			shareDialogAPI.open(false, this.theme.photo);
		}

		$scope.theme = {
			nick : "微博小秘书",
			photo : "img/1.png",
			time : "05-04 23:01",
			img : "img/1.png",
			stared:'stared'
		}
		
		$scope.onStar = function(){
			if(this.theme.stared == "stared"){
				this.theme.stared = "";	
			}else{
				this.theme.stared = "stared";
			}
			
		}

		$scope.onCommentClick = function() {
			$ionicActionSheet.show({
				buttons : [{
					text : '回复'
				}, {
					text : '复制'
				}],
				titleText : '操作评论',
				cancelText : '取消',
				buttonClicked : function(i) {
					switch(i) {
						case 1:
							rename(index);
							break;
						case 0:
							sync(index);
							break;
					}

					return true;
				},
				cancel : function() {

				},
				destructiveButtonClicked : function() {
					remove(index);
					return true;
				}
			});
		};
		var $scrollEl = $("#page-page-scroll");

		var $fixedbar = $("#page-fixed-bar");

		var offset = {
			"star" : 0,
			"comment" : 0
		};

		var scrollTop = 0;

		$scope.switchTab = (function() {

			return function(tab) {

				if ($scope.showlist) {
					offset[$scope.showlist] = scrollTop;
				}

				var top = offset[tab];
				if (scrollTop < 342) {
					top = scrollTop;
				} else if (scrollTop > 342 && offset[tab] < 342) {
					top = 342;
				}

				if (tab == "star") {
					starLoading.init();
				} else {
					commentLoading.init();
				}

				$scope.showlist = tab;
				setTimeout(function() {
					$scrollEl.scrollTop(top);
				}, 20);

			}
		})();

		function loadingMore() {
			if ($scope.showlist == "comment" && $scope.showCommentLoading) {
				commentLoading.more();
			}
			if ($scope.showlist == "star" && $scope.showStarLoading) {
				starLoading.more();
			}
		}


		$scope.showlist = "comment";

		var commentLoading = (function() {
			var init = false;
			var moreLoading = false;
			return {
				"init" : function() {
					if (!init) {
						init = true;
						setTimeout(function() {
							var commentList = [];
							for (var i = 0; i < 20; i++) {
								commentList.push({
									id : "123",
									name : "威廉萌" + i,
									content : "dddd" + i,
									photo : "img/1.png",
									time : "05-03 23:33"
								});
							}

							$scope.commentList = commentList;
							$scope.$apply();
						}, 2000);
					}

				},
				"more" : function() {
					if (!moreLoading) {
						console.info("more");
						moreLoading = true;
						setTimeout(function() {
							var commentList = [];
							for (var i = 0; i < 5; i++) {
								commentList.push({
									id : "123",
									name : "more" + i,
									content : "more" + i,
									photo : "img/1.png",
									time : "05-03 23:33"
								});
							}
							$scope.showCommentLoading = false;
							$scope.commentList = $scope.commentList.concat(commentList);
							$scope.$apply();
						}, 2000);
					}

				}
			}

		})();

		commentLoading.init();

		var starLoading = (function() {
			var init = false;
			var moreLoading = false;
			return {
				"init" : function() {
					if (!init) {
						init = true;
						setTimeout(function() {
							var starList = [];
							for (var i = 0; i < 20; i++) {
								starList.push({
									id : "123",
									name : "威廉萌" + i,
									photo : "img/1.png",
								});
							}
							$scope.starList = starList;
							$scope.$apply();
						}, 2000);
					}

				},
				"more" : function() {
					if (!moreLoading) {
						moreLoading = true;
						setTimeout(function() {
							var starList = [];
							for (var i = 0; i < 5; i++) {
								starList.push({
									id : "123",
									name : "more" + i,
									photo : "img/1.png",
								});
							}
							$scope.showStarLoading = false;
							$scope.starList = $scope.starList.concat(starList);
							$scope.$apply();
						}, 2000);

					}

				}
			}

		})();

		var $view = $("#page-page-view");

		$scrollEl.bind("scroll", function() {
			scrollTop = $(this).scrollTop();
			if (scrollTop + $(this).height() > $view.height()) {
				loadingMore();
			}
		});

	});
})();
