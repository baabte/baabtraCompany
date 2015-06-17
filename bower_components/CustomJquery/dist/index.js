
$(document).ready(function(){

    var popup;

// Adding event listeners for dynamically added dom elements
document.body.addEventListener("DOMNodeInserted", function(event){
    var $elementJustAdded = $(event.target);
      // Attaching the scrollbar to the popup
                if ($elementJustAdded.hasClass('courseDetailsInner')) {
                    $('.courseDetailsPopup').css('display', 'block');
                    $elementJustAdded.slick({//infinite:false});
                      infinite: false,
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      dots: true,
                       prevArrow:'<button type="button" class="prevButton btn btn-info"><i class="glyphicon glyphicon-arrow-left"></i>&nbsp;More</a>',
                       nextArrow:'<button type="button" class="nextButton btn btn-info">More&nbsp;<i class="glyphicon glyphicon-arrow-right"></i></button>',
                      responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3    
                          }
                        },
                        {
                          breakpoint: 960,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 800,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                    });
                }

                 //  setting the position of the bounzd button
                if ($elementJustAdded.hasClass('callbutton-container')) {                    
                    $elementJustAdded.css('top', '20%');
                }
     // end. Attaching the scrollbar to the popup         
}, false);

$(window).resize(function(){

console.log($(window).height());

});


// code for highlighting the imagemask
 $('#imgCourses').mapster({
        noHrefIsMask: false,
        fillColor: '000000',
        fillOpacity: 0.2,
        mapKey: 'data-group',
        strokeWidth: 2,
        stroke: false,
        strokeColor: 'cddce5',
        clickNavigate: true   ,
        scaleMap: true,
        render_select: {
            fillColor: 'adadad'
            },
        areas: [

             {
                key: 'dotNet'                      
            },
            {
                key: 'java'                      
            },
            {
                key: 'python'                      
            },
            {
                key: 'css'                      
            },
            {
                key: 'html'                      
            },
            {
                key: 'iPhone'                      
            },
            {
                key: 'iPhone'                      
            },
            {
                key: 'php'                      
            },
            {
                key: 'android'                      
            },
            {
                key: 'sqlServer'                      
            },
		    {
                key: 'mySql'                      
            },
		    {
			    key: 'testCircle'			    	   
			}
	    ]
    });

// End. code for highlighting the imagemask



// Popup the registration form while clicking on a register now btn in any of the course descriptions
    $(".btnRegPopup").click(function(e){

        e.preventDefault();

        $('.regPopup').css('background', '#ffffff');
        $('.regPopup').find("select").attr("disabled", true);
        $('.regPopup option[value=' + $(this).attr("course") + ']').attr('selected', 'selected');
        //$('.regPopup').val();

        $('.regPopup').bPopup({

            amsl:-50

        }); 

    });

// popup the registration form when someone clicks on a register now btn from the details popup
    
     $(".btnRegPopupInner").live("click", function(e){

        e.preventDefault();
        
        
        $('.regPopup').css('background', '#ffffff');
        $('.regPopup').find("select").attr("disabled", true);
        $('.regPopup option[value=' + $(this).attr("course") + ']').attr('selected', 'selected');
        //$('.regPopup').val();

        $('.regPopup').bPopup({
             closeClass:'close2',
            follow: [false, false] //x, y                     
                              }); 

    });

    // Popup the details of a course while clicking on a view details btn in any of the course descriptions
    $(".btnDetailsPopup").click(function(e){

        e.preventDefault(); 

        $('.courseDetailsPopup').html("");

        $('.courseDetailsPopup').html($(this).parent().find(".courseDetails").html());


        popup = $('.courseDetailsPopup').bPopup({                          
                closeClass:'b-close',
                positionStyle: 'absolute',
                follow: [false, false],
                onClose: function() {
                    $('.courseDetailsPopup').css('display', 'none');

                }//x, y);                        
                                        
         });

    });

    // To close popups when somebody clicks outside the popup
    $("body").click(function(event) {

            var tg = event.target.className;
            tg = tg.split(" ")[0];

            if(
                tg == "courseDetailsPopup" 
                || tg == "courseDetailsInner" 
                || tg == "slick-track")
            {                

                 popup.close();   
            }

    });
    // End. To close popups when somebody clicks outside the popup
    

    // Looping the background images

                $(".promo").bgswitcher({
              images: ["../images/promo/promo2.png", "../images/promo/promo.png", "../images/promo/promo3.png"], // Background images
              effect: "fade", // fade, blind, clip, slide, drop, hide
              interval: 8000, // Interval of switching
              loop: true, // Loop the switching
              shuffle: false, // Shuffle the order of an images
              duration: 3000, // Effect duration
              easing: "swing" // Effect easing
            });
        
        //End.  Looping the background images

/*
By Lijin
for sending mail purpose

*/

var mailUrl="http://baabtra.com/assets/mail/sendmail.php";
    $("#btn-signup-pop").click(function(){
        var flag=true;
        var fn=$('#txt-fn-pop').val();
        var email=$('#txt-email-pop').val();
        var mn=$('#txt-mn-pop').val();
        var pw=$('#txt-pwd-pop').val();
        var crs=$('#ddl-crs-pop').val();

        //validation
            if(fn==''){$('#txt-fn-pop').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-fn-pop').css({'border':'1px solid #ccc'});}

            if(pw==''){$('#txt-pwd-pop').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-pwd-pop').css({'border':'1px solid #ccc'});}

            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (email== '' || !re.test(email))
            {$('#txt-email-pop').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-email-pop').css({'border':'1px solid #ccc'});}

            var reMob = /^[0-9+-]/;
            if (mn== '' || !reMob.test(mn))
            {$('#txt-mn-pop').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-mn-pop').css({'border':'1px solid #ccc'});}



        if(flag)
        $.post(mailUrl,{fn:fn,email:email,mn:mn,pw:pw,crs:crs},function(resp,status,xhr){
            if((resp*1)==0){
                $("#signupalert-pop").hide();
                $("#signupalert-pop").find('p').html('Inconvenience is regretted, please try again.');
                $("signupalert-pop").attr('class','alert alert-danger');
                $("#signupalert-pop").show();
            }else
            {
                $("#signupalert-pop").hide();
                $("#signupalert-pop").find('p').html('Registered successfully.');
                $("signupalert-pop").attr('class','alert alert-success');
                $("#signupalert-pop").show();
                    $('#txt-fn-pop').val('');
                    $('#txt-email-pop').val('');
                    $('#txt-mn-pop').val('');
                    $('#txt-pwd-pop').val('');

            }
        });
    });


$("#btn-signup-main").click(function(){
        var flag=true;
        var fn=$('#txt-fn-main').val();
        var email=$('#txt-email-main').val();
        var mn=$('#txt-mn-main').val();
        var pw=$('#txt-pwd-main').val();
        var crs=$('#ddl-crs-main').val();

        //validation
            if(fn==''){$('#txt-fn-main').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-fn-main').css({'border':'1px solid #ccc'});}

            if(pw==''){$('#txt-pwd-main').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-pwd-main').css({'border':'1px solid #ccc'});}

            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (email== '' || !re.test(email))
            {$('#txt-email-main').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-email-main').css({'border':'1px solid #ccc'});}

            var reMob = /^[0-9+-]/;
            if (mn== '' || !reMob.test(mn))
            {$('#txt-mn-main').css({'border':'1px solid #CE0505'});flag=false;}
            else{$('#txt-mn-main').css({'border':'1px solid #ccc'});}



        if(flag)
        $.post(mailUrl,{fn:fn,email:email,mn:mn,pw:pw,crs:crs},function(resp,status,xhr){
            

            if((resp*1)==0){
                $("#signupalert-main").hide();
                $("#signupalert-main").find('p').html('Inconvenience is regretted, please try again.');
                $("signupalert-main").attr('class','alert alert-danger');
                $("#signupalert-main").show();
            }else
            {
                $("#signupalert-main").hide();
                $("#signupalert-main").find('p').html('Registered successfully.');
                $("signupalert-main").attr('class','alert alert-success');
                $("#signupalert-main").show();
                    $('#txt-fn-main').val('');
                    $('#txt-email-main').val('');
                    $('#txt-mn-main').val('');
                    $('#txt-pwd-main').val('');

            }
        });

    });

  
// End Popups

});