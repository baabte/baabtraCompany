angular.module('baabtra').directive('docViewer',[ '$sce','$modal',function($sce,$modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"@data",
			courseElement:"@"
		},
		templateUrl: 'angularModules/courseElementFields/docViewer/directives/Directive-docViewer.html',
		link: function(scope, element, attrs, fn) {

			//getting the height and width of the element to set the height and width of the icon
			scope.elemWidth = $(element).width();
			scope.elemHeight = $(element).height();

			scope.icons={
				"application/pdf":{icon:"fa-file-pdf-o", color:"red"},
				
				"application/vnd.ms-powerpoint":{icon:"fa-file-powerpoint-o", color:"orange"},
				"application/ms-powerpoint":{icon:"fa-file-powerpoint-o", color:"orange"},
				
				//word
				"application/msword":{icon:"fa-file-word-o", color:"blue"},			
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{icon:"fa-file-word-o", color:"blue"},

				//excel				
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{icon:"fa-file-excel-o", color:"green"},

				"application/javscript":{icon:"fa-file-archive-o", color:"#FFEE58"},
				
				"application/zip":{icon:"fa-file-code-o", color:"#f4cb71"},
				
				"application/rar":{icon:"fa-file-archive-o", color:"#f4cb71"},
				"default":{icon:"fa-file-o", color:"#444444"}
				
			}

			scope.docObj = JSON.parse(scope.data);			
			scope.docObjParent = scope.courseElement;

			if(angular.equals(scope.icons[scope.docObj.fileType], undefined)){
				scope.docIcon = scope.icons["default"].icon;
				scope.docColor = scope.icons["default"].color;
			}
			 else{
			 	scope.docIcon =scope.icons[scope.docObj.fileType].icon;
			 	scope.docColor =scope.icons[scope.docObj.fileType].color;
			 }

			scope.trustSrc = function(src) {
				return $sce.trustAsResourceUrl(src);
			};


		}
	};
}]);
