/* ======= Animations ======= */
jQuery(document).ready(function($) {

    //Only animate elements when using non-mobile devices    
    if (jQuery.browser.mobile === false) {
    
        /* Animate elements in #Promo */
        $('#promo .title').css('opacity', 0).one('inview', function(isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        $('#promo .bannerImg').css('opacity', 0).one('inview', function(isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
        });
        
        $('#promo .phone').css('opacity', 0).one('inview', function(isInView) {
            if (isInView) {$(this).addClass('animated fadeInRight delayp3');}
        });
        
        $('.download-area').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInRight delayp4');}
        });
    
        /* Animate elements in #Features */
        $('#about .icon').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        
        /* Animate elements in #How */
        $('#programs .video-wrapper').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInLeft delayp1');}
        });
        
        $('#programs .content').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInRight delayp2');}
        });
        
        /* Animate elements in #faq */
        $('#faq .title').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        $('#faq .question').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
        });
        $('#faq .answer').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
        });
        $('#faq .btn').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
        });
        
        /* Animate elements in #story */
        $('#bProfile .content').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInLeft delayp1');}
        });
        
        $('#bProfile .team').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInRight delayp2');}
        });
        
        /* Animate elements in #people */
        $('#people .title').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        
        $('#people .quote-box').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
        });
        
        $('#people .people').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
        });
        
        $('#people .press').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        
        /* Animate elements in #coursesOnline */
        $('#coursesOnline .title').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        
        $('#coursesOnline .price-1').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInLeft delayp2');}
        });
        
        $('#coursesOnline .price-2').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp4');}
        });
        
        $('#coursesOnline .price-3').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInRight delayp2');}
        });

        /* Animate elements in #coursesOffline */
        $('#coursesOffline .title').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        
        $('#coursesOffline .price-1').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInLeft delayp2');}
        });
        
        $('#coursesOffline .price-2').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp4');}
        });
        
        $('#coursesOffline .price-3').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInRight delayp2');}
        });
        
        /* Animate elements in #contact */
        $('#contact .title').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
        });
        
        $('#contact .intro').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
        });
        
        $('#contact .contact-form').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
        });
        
        $('#contact .social-icons').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delayp4');}
        });
        
    }


});