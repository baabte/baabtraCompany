angular.module('baabtra').directive('paymentReceipt', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			receiptDetails: "=",
			companyObject:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-paymentReceipt.html',
		link: function(scope, element, attrs, fn) {



			// scope.receiptDetails = 	{
			// 		    "_id" : ObjectId("552d08c435fb9f4eea1812ac"),
			// 		    "urmId" : "550ab20bd4f9075d40a10d52",
			// 		    "crmId" : "550ab20bd4f9075d40a10d52",
			// 		    "companyId" : "54978cc57525614f6e3e710b",
			// 		    "receiptDetails" : [ 
			// 		        {
			// 		            "count" : 2,
			// 		            "discount" : 4,
			// 		            "courseId" : "54d8a8a7ef14f722f48907b0",
			// 		            "currency" : "AED",
			// 		            "course" : "Test 1",
			// 		            "actualAmount" : 3000,
			// 		            "payableAmount" : 2880
			// 		        }, 
			// 		        {
			// 		            "count" : 1,
			// 		            "discount" : 5,
			// 		            "courseId" : "54d914faef14f722f48907df",
			// 		            "currency" : "$",
			// 		            "course" : "Test 123",
			// 		            "actualAmount" : 200,
			// 		            "payableAmount" : 190
			// 		        }
			// 		    ],
			// 		    "activeFlag" : 1,
			// 		    "orderFormId" : "5523792e23a34a4709b27df1",
			// 		    "orderFormCode" : "baa-105",
			// 		    "updatedDate" : ISODate("2015-04-14T12:32:04.814Z"),
			// 		    "createdDate" : ISODate("2015-04-14T12:32:04.814Z"),
			// 		    "customCompanyCode" : "PR-1002"
			// 		};






		}
	};
});
