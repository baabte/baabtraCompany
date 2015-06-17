angular.module('baabtra').directive('randomBackgroundColor',['$compile','$rootScope', function($compile,$rootScope) {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {

			var colors = ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange"];


			var colorsArray = {

				"red":["btn-material-red","btn-material-red-400","btn-material-red-500","btn-material-red-600","btn-material-red-700","btn-material-red-800","btn-material-red-900","btn-material-red-A100","btn-material-red-A200","btn-material-red-A400","btn-material-red-A700"],

				"pink":["btn-material-pink","btn-material-pink-400","btn-material-pink-500","btn-material-pink-600","btn-material-pink-700","btn-material-pink-800","btn-material-pink-900","btn-material-pink-A100","btn-material-pink-A200","btn-material-pink-A400","btn-material-pink-A700"],

				"purple":["btn-material-purple","btn-material-purple-400","btn-material-purple-500","btn-material-purple-600","btn-material-purple-700","btn-material-purple-800","btn-material-purple-900","btn-material-purple-A100","btn-material-purple-A200","btn-material-purple-A400","btn-material-purple-A700"],

				"deep-purple":["btn-material-deep-purple","btn-material-deep-purple-400","btn-material-deep-purple-500","btn-material-deep-purple-600","btn-material-deep-purple-700","btn-material-deep-purple-800","btn-material-deep-purple-900","btn-material-deep-purple-A100","btn-material-deep-purple-A200","btn-material-deep-purple-A400","btn-material-deep-purple-A700"],

				"indigo":["btn-material-indigo","btn-material-indigo-400","btn-material-indigo-500","btn-material-indigo-600","btn-material-indigo-700","btn-material-indigo-800","btn-material-indigo-900","btn-material-indigo-A100","btn-material-indigo-A200","btn-material-indigo-A400","btn-material-indigo-A700"],

				"blue":["btn-material-blue","btn-material-blue-400","btn-material-blue-500","btn-material-blue-600","btn-material-blue-700","btn-material-blue-800","btn-material-blue-900","btn-material-blue-A100","btn-material-blue-A200","btn-material-blue-A400","btn-material-blue-A700"],

				"light-blue":["btn-material-light-blue","btn-material-light-blue-400","btn-material-light-blue-500","btn-material-light-blue-600","btn-material-light-blue-700","btn-material-light-blue-800","btn-material-light-blue-900","btn-material-light-blue-A100","btn-material-light-blue-A200","btn-material-light-blue-A400","btn-material-light-blue-A700"],

				"cyan":["btn-material-cyan","btn-material-cyan-400","btn-material-cyan-500","btn-material-cyan-600","btn-material-cyan-700","btn-material-cyan-800","btn-material-cyan-900","btn-material-cyan-A100","btn-material-cyan-A200","btn-material-cyan-A400","btn-material-cyan-A700"],

				"teal":["btn-material-teal","btn-material-teal-400","btn-material-teal-500","btn-material-teal-600","btn-material-teal-700","btn-material-teal-800","btn-material-teal-900","btn-material-teal-A100","btn-material-teal-A200","btn-material-teal-A400","btn-material-teal-A700"],

				"green":["btn-material-green","btn-material-green-400","btn-material-green-500","btn-material-green-600","btn-material-green-700","btn-material-green-800","btn-material-green-900","btn-material-green-A200","btn-material-green-A400","btn-material-green-A700"],

				"light-green":["btn-material-light-green","btn-material-light-green-400","btn-material-light-green-500","btn-material-light-green-600","btn-material-light-green-700","btn-material-light-green-800","btn-material-light-green-900","btn-material-light-green-A100","btn-material-light-green-A200","btn-material-light-green-A400","btn-material-light-green-A700"],

				"lime":["btn-material-lime","btn-material-lime-400","btn-material-lime-500","btn-material-lime-600","btn-material-lime-700","btn-material-lime-800","btn-material-lime-900","btn-material-lime-A100","btn-material-lime-A200","btn-material-lime-A400","btn-material-lime-A700"],

				"yellow":["btn-material-yellow","btn-material-yellow-400","btn-material-yellow-500","btn-material-yellow-600","btn-material-yellow-700","btn-material-yellow-800","btn-material-yellow-900","btn-material-yellow-A100","btn-material-yellow-A200","btn-material-yellow-A400","btn-material-yellow-A700"],

				"amber":["btn-material-amber","btn-material-amber-400","btn-material-amber-500","btn-material-amber-600","btn-material-amber-700","btn-material-amber-800","btn-material-amber-900","btn-material-amber-A100","btn-material-amber-A200","btn-material-amber-A400","btn-material-amber-A700"],

				"orange":["btn-material-orange","btn-material-orange-400","btn-material-orange-500","btn-material-orange-600","btn-material-orange-700","btn-material-orange-800","btn-material-orange-900","btn-material-orange-A100","btn-material-orange-A200","btn-material-orange-A400","btn-material-orange-A700"],

				"deep-orange":["btn-material-deep-orange","btn-material-deep-orange-400","btn-material-deep-orange-500","btn-material-deep-orange-600","btn-material-deep-orange-700","btn-material-deep-orange-800","btn-material-deep-orange-900","btn-material-deep-orange-A100","btn-material-deep-orange-A200","btn-material-deep-orange-A400","btn-material-deep-orange-A700"]};

			var colorArrayCorelation = {
					"deep-orange":["orange","amber","yellow"],
					"orange":["amber","yellow"],
					"amber":["orange","deep-orange"],
					"yellow":["amber","lime","light-green"],
					"lime":["light-green","green","yellow"],
					"light-green":["lime","green","teal"],
					"green":["teal","light-green","lime"],
					"teal":["green","light-green","lime"],
					"cyan":["teal","green","blue"],
					"light-blue":["teal","indigo","deep-purple"],
					"blue":["indigo","deep-purple","teal"],
					"indigo":["blue","cyan","purple"],
					"deep-purple":["pink","red","orange","deep-orange"],
					"purple":["indigo","blue","pink"],
					"pink":["purple","deep-purple","red"],
					"red":["pink","purple","deep-orange","deep-purple"]
			};
				

			if(!angular.equals(attrs.parent,undefined)){
				var parentColor = $('#courseHeaderBg').attr('randomBg');
				if(!angular.equals(parentColor,undefined)){
					var parentCollection = colorArrayCorelation[parentColor];
					var childColor = parentCollection[Math.floor(Math.random() * (parentCollection.length - 1) + 1)];
					
					var childClass = colorsArray[childColor][Math.floor(Math.random() * (colorsArray[childColor].length - 1))];
					$(element).addClass(childClass);
				}		
			}
			else{

	

				if(angular.equals($rootScope.userinfo.ActiveUserData.subTitleAndBackColor,undefined)||angular.equals($rootScope.userinfo.ActiveUserData.subTitleAndBackColor,"random")||!$rootScope.userinfo.ActiveUserData.subTitleAndBackColor){
						var randomColor =  colors[Math.floor(Math.random() * (colors.length - 1))];
						var randomClass = colorsArray[randomColor][Math.floor(Math.random() * (colorsArray[randomColor].length - 1))];

						$(element).addClass(randomClass);
						$(element).attr("randomBg",randomColor);
						$(element).removeClass("random-background-color");
						$compile(element)(scope);
					
				}else{
					if($rootScope.userinfo.ActiveUserData.subTitleAndBackColor.Backgroundcolour){
						$(element).addClass($rootScope.userinfo.ActiveUserData.subTitleAndBackColor.Backgroundcolour);	
					}else
					{
						var randomColor =  colors[Math.floor(Math.random() * (colors.length - 1))];
						var randomClass = colorsArray[randomColor][Math.floor(Math.random() * (colorsArray[randomColor].length - 1))];

						$(element).addClass(randomClass);
						$(element).attr("randomBg",randomColor);
						$(element).removeClass("random-background-color");
						$compile(element)(scope);
					}
					
					
				}
				
			}
			
			// var colors = ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","bright-green", "majenta", "grey"];


			// var colorsArray = {

			// 	"red":["btn-material-red","btn-material-red-400","btn-material-red-500","btn-material-red-600","btn-material-red-700","btn-material-red-800","btn-material-red-900","btn-material-red-A100","btn-material-red-A200","btn-material-red-A400","btn-material-red-A700"],

			// 	"pink":["btn-material-pink","btn-material-pink-400","btn-material-pink-500","btn-material-pink-600","btn-material-pink-700","btn-material-pink-800","btn-material-pink-900","btn-material-pink-A100","btn-material-pink-A200","btn-material-pink-A400","btn-material-pink-A700"],

			// 	"purple":["btn-material-purple","btn-material-purple-400","btn-material-purple-500","btn-material-purple-600","btn-material-purple-700","btn-material-purple-800","btn-material-purple-900","btn-material-purple-A100","btn-material-purple-A200","btn-material-purple-A400","btn-material-purple-A700"],

			// 	"deep-purple":["btn-material-deep-purple","btn-material-deep-purple-400","btn-material-deep-purple-500","btn-material-deep-purple-600","btn-material-deep-purple-700","btn-material-deep-purple-800","btn-material-deep-purple-900","btn-material-deep-purple-A100","btn-material-deep-purple-A200","btn-material-deep-purple-A400","btn-material-deep-purple-A700"],

			// 	"indigo":["btn-material-indigo","btn-material-indigo-400","btn-material-indigo-500","btn-material-indigo-600","btn-material-indigo-700","btn-material-indigo-800","btn-material-indigo-900","btn-material-indigo-A100","btn-material-indigo-A200","btn-material-indigo-A400","btn-material-indigo-A700"],

			// 	"blue":["btn-material-blue","btn-material-blue-400","btn-material-blue-500","btn-material-blue-600","btn-material-blue-700","btn-material-blue-800","btn-material-blue-900","btn-material-blue-A100","btn-material-blue-A200","btn-material-blue-A400","btn-material-blue-A700"],

			// 	"light-blue":["btn-material-light-blue","btn-material-light-blue-400","btn-material-light-blue-500","btn-material-light-blue-600","btn-material-light-blue-700","btn-material-light-blue-800","btn-material-light-blue-900","btn-material-light-blue-A100","btn-material-light-blue-A200","btn-material-light-blue-A400","btn-material-light-blue-A700"],

			// 	"cyan":["btn-material-cyan","btn-material-cyan-400","btn-material-cyan-500","btn-material-cyan-600","btn-material-cyan-700","btn-material-cyan-800","btn-material-cyan-900","btn-material-cyan-A100","btn-material-cyan-A200","btn-material-cyan-A400","btn-material-cyan-A700"],

			// 	"teal":["btn-material-teal","btn-material-teal-400","btn-material-teal-500","btn-material-teal-600","btn-material-teal-700","btn-material-teal-800","btn-material-teal-900","btn-material-teal-A100","btn-material-teal-A200","btn-material-teal-A400","btn-material-teal-A700"],

			// 	"green":["btn-material-green","btn-material-green-400","btn-material-green-500","btn-material-green-600","btn-material-green-700","btn-material-green-800","btn-material-green-900","btn-material-green-A200","btn-material-green-A400","btn-material-green-A700"],

			// 	"light-green":["btn-material-light-green","btn-material-light-green-400","btn-material-light-green-500","btn-material-light-green-600","btn-material-light-green-700","btn-material-light-green-800","btn-material-light-green-900","btn-material-light-green-A100","btn-material-light-green-A200","btn-material-light-green-A400","btn-material-light-green-A700"],

			// 	"lime":["btn-material-lime","btn-material-lime-400","btn-material-lime-500","btn-material-lime-600","btn-material-lime-700","btn-material-lime-800","btn-material-lime-900","btn-material-lime-A100","btn-material-lime-A200","btn-material-lime-A400","btn-material-lime-A700"],

			// 	"yellow":["btn-material-yellow","btn-material-yellow-400","btn-material-yellow-500","btn-material-yellow-600","btn-material-yellow-700","btn-material-yellow-800","btn-material-yellow-900","btn-material-yellow-A100","btn-material-yellow-A200","btn-material-yellow-A400","btn-material-yellow-A700"],

			// 	"amber":["btn-material-amber","btn-material-amber-400","btn-material-amber-500","btn-material-amber-600","btn-material-amber-700","btn-material-amber-800","btn-material-amber-900","btn-material-amber-A100","btn-material-amber-A200","btn-material-amber-A400","btn-material-amber-A700"],

			// 	"orange":["btn-material-orange","btn-material-orange-400","btn-material-orange-500","btn-material-orange-600","btn-material-orange-700","btn-material-orange-800","btn-material-orange-900","btn-material-orange-A100","btn-material-orange-A200","btn-material-orange-A400","btn-material-orange-A700"],

			// 	"deep-orange":["btn-material-deep-orange","btn-material-deep-orange-400","btn-material-deep-orange-500","btn-material-deep-orange-600","btn-material-deep-orange-700","btn-material-deep-orange-800","btn-material-deep-orange-900","btn-material-deep-orange-A100","btn-material-deep-orange-A200","btn-material-deep-orange-A400","btn-material-deep-orange-A700"]};

			
			// var colorsArray = {

			// 	"red":"#F44336",

			// 	"pink":"#E91E63",

			// 	"purple":"#9c27b0",

			// 	"deep-purple":"#673ab7",

			// 	"indigo":"#3f51b5",

			// 	"blue":"#2196f3",

			// 	"light-blue":"#03a9f4",

			// 	"cyan":"#00bcd4",

			// 	"teal":"#009688",

			// 	"green":"#4caf50",

			// 	"light-green":"#8bc34a",

			// 	"lime":"#cddc39",

			// 	"yellow":"#ffeb3b",

			// 	"amber":"#ffc107",

			// 	"orange":"#ff9800",

			// 	"deep-orange":"#ff5722",

			// 	"bright-green":"#FFFF59",

			// 	"majenta":"#FF4242",

			// 	"grey": "#3F7CAC"};



			// var colorArrayCorelation = {
			// 		"grey":["#95AFBA","#BDC4A7","#D5E1A3","#E2F89C"],
			// 		"majenta":["#EBD4CB","#DA9F93","#D5E1A3","#B6465F"],
			// 		"bright-green":["#AAFAC8","#C7FFED","#D5E1A3","#BBC8CA"],
			// 		"deep-orange":["#FCB97D","#F0BA61","#D4D4AA","#AD95D9"],
			// 		"orange":["#04E762","#6B2D5C","#EAF8BF","#F0386B"],
			// 		"amber":["#DEF6CA","#FE6105","#E477DA","#6279FF"],
			// 		"yellow":["#EE6352","#59CD90","#3FA7D6","#A682FF"],
			// 		"lime":["#405862","#00805B","#179054","#074F57"],
			// 		"light-green":["#F2C14E","#F78154","#385C75","#E77245"],
			// 		"green":["#88D18A","#4F345A","#FFC857","#EDE5A6"],
			// 		"teal":["#D8A47F","#EF8354","#F45B69","#B9FFB7"],
			// 		"cyan":["#3386EE","#4BA8F3","#E1E0E9","#4ED45F"],
			// 		"light-blue":["#EFBDEB","#95CE82","#6461A0","#314CB6"],
			// 		"blue":["#EE6352","#59CD90","#FAC05E","#F79D84"],
			// 		"indigo":["#DA587A","#EFC69B","#51A3A3","#F6AE2D"],
			// 		"deep-purple":["#86C468","#D15199","#F45B69","#42B672"],
			// 		"purple":["#44FFD1","#6153CC","#62C370","#20063B"],
			// 		"pink":["#C2F9BB","#9AD1D4","#62C370","#20063B"],
			// 		"red":["#E4B363","#E28C5A","#CA875C","#B15A33"]
			// };

			// var colorArrayCorelation = {
			// 		"deep-orange":["orange","amber","yellow"],
			// 		"orange":["amber","yellow"],
			// 		"amber":["orange","deep-orange"],
			// 		"yellow":["amber","lime","light-green"],
			// 		"lime":["light-green","green","yellow"],
			// 		"light-green":["lime","green","teal"],
			// 		"green":["teal","light-green","lime"],
			// 		"teal":["green","light-green","lime"],
			// 		"cyan":["teal","green","blue"],
			// 		"light-blue":["teal","indigo","deep-purple"],
			// 		"blue":["indigo","deep-purple","teal"],
			// 		"indigo":["blue","cyan","purple"],
			// 		"deep-purple":["pink","red","orange","deep-orange"],
			// 		"purple":["indigo","blue","pink"],
			// 		"pink":["purple","deep-purple","red"],
			// 		"red":["pink","purple","deep-orange","deep-purple"]
			// };
				

			// if(!angular.equals(attrs.parent,undefined)){
			// 	var parentColor = $('#courseHeaderBg').attr('randomBg');
			// 	if(!angular.equals(parentColor,undefined)){
			// 		var parentCollection = colorArrayCorelation[parentColor];
			// 		var childColor = parentCollection[Math.floor(Math.random() * (parentCollection.length - 1) + 1)];
					
			// 		var childClass = colorsArray[childColor][Math.floor(Math.random() * (colorsArray[childColor].length - 1))];
			// 		$(element).addClass(childClass);
			// 	}		
			// }
			// else{

			// var randomColor =  colors[Math.floor(Math.random() * (colors.length - 1))];
			// var randomClass = colorsArray[randomColor][Math.floor(Math.random() * (colorsArray[randomColor].length - 1))];

			// $(element).addClass(randomClass);
			// $(element).attr("randomBg",randomColor);
			// $(element).removeClass("random-background-color");
			// $compile(element)(scope);
			// }


			// if(!angular.equals(attrs.parent,undefined)){
			// 	var parentColor = $('#courseHeaderBg').attr('randomBg');
			// 	if(!angular.equals(parentColor,undefined)){
			// 		var parentCollection = colorArrayCorelation[parentColor];
			// 		var childColor = parentCollection[Math.floor(Math.random() * (parentCollection.length - 1) + 1)];
					
			// 		//var childClass = colorsArray[childColor][Math.floor(Math.random() * (colorsArray[childColor].length - 1))];
			// 		$(element).css('background',childColor);
			// 	}		
			// }
			// else{

			// var randomColor =  colors[Math.floor(Math.random() * (colors.length - 1))];
			// var randomColorCode = colorsArray[randomColor];			

			// $(element).css('background',randomColorCode);
			// $(element).attr("randomBg",randomColor);
			// $(element).removeClass("random-background-color");
			// $compile(element)(scope);
			// }
		}
	};
}]);