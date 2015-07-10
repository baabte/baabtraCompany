angular.module('baabtra').directive('starRating', function() {
    return {
        restrict: 'A',
        replace:true,
        templateUrl: 'angularModules/common/directives/Directive-starRating.html',
        link: function (scope, elem, attrs) {
            scope.ratingValue = (parseFloat(attrs.ratingValue)/parseInt(attrs.max))*5;
            scope.max = 5;
            scope.stars = [];
            var rem = scope.ratingValue%1;
            var noStars =  parseInt(scope.ratingValue/1);
            var flag = false;
            for (var i = 0; i < scope.max; i++) {
                if(noStars > i){
                    scope.stars.push({filled:''});
                }
                else if(rem > 0.5 && !flag){
                    scope.stars.push({filled:''});
                    flag = true;
                }
                else if(rem < 0.5 && !flag){
                    scope.stars.push({filled:'-half-o'});
                    flag = true;
                }
                else{
                    scope.stars.push({filled:'-o'});
                }
            }
        }
    };
});
