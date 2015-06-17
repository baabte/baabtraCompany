angular.module('baabtra').directive('pdfBuilder', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
	
			//  var printSection = document.getElementById('printSection');
 
   // //      // if there is no printing section, create one
   //      if (!printSection) {
   //          printSection = document.createElement('div');
   //          printSection.id = 'printSection';
   //          document.body.appendChild(printSection);
   //      }
            // We'll make our own renderer to skip this editor

			element.bind('click', function(evt){    
			  
			  var elemToPrint = document.getElementById(attrs.printElementId);
			  var domClone = elemToPrint.cloneNode(true);
			  //console.log(elemToPrint);
               var doc = new jsPDF();
               //doc.setFontSize(16);
              //printSection.appendChild(domClone);
                doc.fromHTML(domClone, 15, 15, {
                  'width': 170
                 });
                doc.save('order-form.pdf');

           });
		}
	};
});