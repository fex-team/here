(function(win){
	angular.module('mobiscroll', []).directive('mobiscrollDate', function() {
		return {
			restrict : 'A',
			scope : {},
			controller : function($scope, $element, $sce) {
				
			},
			link : function(scope, element, attrs) {
				$(element[0]).scroller({
                    theme: 'ios7',
                    mode: 'scroller',
                    lang: "zh",
                    display: "bottom",
                    animate: "",
                    preset: 'date',
                    dateOrder: 'd Dmmyy'
                });
			}
		}
	}).directive('mobiscrollGroup', function() {
		return {
			restrict : 'A',
			scope : {},
			controller : function($scope, $element, $sce) {
				
			},
			link : function(scope, element, attrs) {
				var group =	attrs['group'] || false;
				setTimeout(function(){
					
					$(element[0]).scroller({
	                    theme: 'ios7',
	                    mode: 'scroller',
	                    lang: "zh",
	                    display: "bottom",
	                    animate: "flip",
	                    preset: 'select',
	                    group: group,
	                    width: 50
	                });
				},50);
				
			}
		}
	})
})(window)
