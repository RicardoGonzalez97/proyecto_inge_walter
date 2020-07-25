/*! perfect-scrollbar - v0.5.6
 * http://noraesae.github.com/perfect-scrollbar/
 * Copyright (c) 2014 Hyunje Alex Jun; Licensed MIT */
(function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)})(function(e){"use strict";function t(e){return"string"==typeof e?parseInt(e,10):~~e}var o={wheelSpeed:1,wheelPropagation:!1,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},n=0,r=function(){var e=n++;return function(t){var o=".perfect-scrollbar-"+e;return t===void 0?o:t+o}};e.fn.perfectScrollbar=function(n,l){return this.each(function(){function i(e,o){var n=e+o,r=x-k;W=0>n?0:n>r?r:n;var l=t(W*(C-x)/(x-k));S.scrollTop(l)}function a(e,o){var n=e+o,r=P-E;X=0>n?0:n>r?r:n;var l=t(X*(D-P)/(P-E));S.scrollLeft(l)}function c(e){return L.minScrollbarLength&&(e=Math.max(e,L.minScrollbarLength)),L.maxScrollbarLength&&(e=Math.min(e,L.maxScrollbarLength)),e}function s(){var e={width:P,display:M?"inherit":"none"};e.left=I?S.scrollLeft()+P-D:S.scrollLeft(),q?e.bottom=R-S.scrollTop():e.top=B+S.scrollTop(),K.css(e);var t={top:S.scrollTop(),height:x,display:Y?"inherit":"none"};F?t.right=I?D-S.scrollLeft()-z-Q.outerWidth():z-S.scrollLeft():t.left=I?S.scrollLeft()+2*P-D-G-Q.outerWidth():G+S.scrollLeft(),U.css(t),O.css({left:X,width:E-H}),Q.css({top:W,height:k-J})}function d(){S.removeClass("ps-active-x"),S.removeClass("ps-active-y"),P=L.includePadding?S.innerWidth():S.width(),x=L.includePadding?S.innerHeight():S.height(),D=S.prop("scrollWidth"),C=S.prop("scrollHeight"),!L.suppressScrollX&&D>P+L.scrollXMarginOffset?(M=!0,E=c(t(P*P/D)),X=t(S.scrollLeft()*(P-E)/(D-P))):(M=!1,E=0,X=0,S.scrollLeft(0)),!L.suppressScrollY&&C>x+L.scrollYMarginOffset?(Y=!0,k=c(t(x*x/C)),W=t(S.scrollTop()*(x-k)/(C-x))):(Y=!1,k=0,W=0,S.scrollTop(0)),X>=P-E&&(X=P-E),W>=x-k&&(W=x-k),s(),M&&S.addClass("ps-active-x"),Y&&S.addClass("ps-active-y")}function u(){var t,o,n=!1;O.bind(j("mousedown"),function(e){o=e.pageX,t=O.position().left,K.addClass("in-scrolling"),n=!0,e.stopPropagation(),e.preventDefault()}),e(A).bind(j("mousemove"),function(e){n&&(a(t,e.pageX-o),d(),e.stopPropagation(),e.preventDefault())}),e(A).bind(j("mouseup"),function(){n&&(n=!1,K.removeClass("in-scrolling"))}),t=o=null}function p(){var t,o,n=!1;Q.bind(j("mousedown"),function(e){o=e.pageY,t=Q.position().top,n=!0,U.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(A).bind(j("mousemove"),function(e){n&&(i(t,e.pageY-o),d(),e.stopPropagation(),e.preventDefault())}),e(A).bind(j("mouseup"),function(){n&&(n=!1,U.removeClass("in-scrolling"))}),t=o=null}function f(e,t){var o=S.scrollTop();if(0===e){if(!Y)return!1;if(0===o&&t>0||o>=C-x&&0>t)return!L.wheelPropagation}var n=S.scrollLeft();if(0===t){if(!M)return!1;if(0===n&&0>e||n>=D-P&&e>0)return!L.wheelPropagation}return!0}function v(){function e(e){var t=e.originalEvent.deltaX,o=-1*e.originalEvent.deltaY;return(t===void 0||o===void 0)&&(t=-1*e.originalEvent.wheelDeltaX/6,o=e.originalEvent.wheelDeltaY/6),e.originalEvent.deltaMode&&1===e.originalEvent.deltaMode&&(t*=10,o*=10),t!==t&&o!==o&&(t=0,o=e.originalEvent.wheelDelta),[t,o]}function t(t){var n=e(t),r=n[0],l=n[1];o=!1,L.useBothWheelAxes?Y&&!M?(l?S.scrollTop(S.scrollTop()-l*L.wheelSpeed):S.scrollTop(S.scrollTop()+r*L.wheelSpeed),o=!0):M&&!Y&&(r?S.scrollLeft(S.scrollLeft()+r*L.wheelSpeed):S.scrollLeft(S.scrollLeft()-l*L.wheelSpeed),o=!0):(S.scrollTop(S.scrollTop()-l*L.wheelSpeed),S.scrollLeft(S.scrollLeft()+r*L.wheelSpeed)),d(),o=o||f(r,l),o&&(t.stopPropagation(),t.preventDefault())}var o=!1;window.onwheel!==void 0?S.bind(j("wheel"),t):window.onmousewheel!==void 0&&S.bind(j("mousewheel"),t)}function g(){var t=!1;S.bind(j("mouseenter"),function(){t=!0}),S.bind(j("mouseleave"),function(){t=!1});var o=!1;e(A).bind(j("keydown"),function(n){if((!n.isDefaultPrevented||!n.isDefaultPrevented())&&t){for(var r=document.activeElement?document.activeElement:A.activeElement;r.shadowRoot;)r=r.shadowRoot.activeElement;if(!e(r).is(":input,[contenteditable]")){var l=0,i=0;switch(n.which){case 37:l=-30;break;case 38:i=30;break;case 39:l=30;break;case 40:i=-30;break;case 33:i=90;break;case 32:case 34:i=-90;break;case 35:i=n.ctrlKey?-C:-x;break;case 36:i=n.ctrlKey?S.scrollTop():x;break;default:return}S.scrollTop(S.scrollTop()-i),S.scrollLeft(S.scrollLeft()+l),o=f(l,i),o&&n.preventDefault()}}})}function b(){function e(e){e.stopPropagation()}Q.bind(j("click"),e),U.bind(j("click"),function(e){var o=t(k/2),n=e.pageY-U.offset().top-o,r=x-k,l=n/r;0>l?l=0:l>1&&(l=1),S.scrollTop((C-x)*l)}),O.bind(j("click"),e),K.bind(j("click"),function(e){var o=t(E/2),n=e.pageX-K.offset().left-o,r=P-E,l=n/r;0>l?l=0:l>1&&(l=1),S.scrollLeft((D-P)*l)})}function h(){function t(){var e=window.getSelection?window.getSelection():document.getSlection?document.getSlection():{rangeCount:0};return 0===e.rangeCount?null:e.getRangeAt(0).commonAncestorContainer}function o(){r||(r=setInterval(function(){S.scrollTop(S.scrollTop()+l.top),S.scrollLeft(S.scrollLeft()+l.left),d()},50))}function n(){r&&(clearInterval(r),r=null),K.removeClass("in-scrolling"),U.removeClass("in-scrolling")}var r=null,l={top:0,left:0},i=!1;e(A).bind(j("selectionchange"),function(){e.contains(S[0],t())?i=!0:(i=!1,n())}),e(window).bind(j("mouseup"),function(){i&&(i=!1,n())}),e(window).bind(j("mousemove"),function(e){if(i){var t={x:e.pageX,y:e.pageY},r=S.offset(),a={left:r.left,right:r.left+S.outerWidth(),top:r.top,bottom:r.top+S.outerHeight()};t.x<a.left+3?(l.left=-5,K.addClass("in-scrolling")):t.x>a.right-3?(l.left=5,K.addClass("in-scrolling")):l.left=0,t.y<a.top+3?(l.top=5>a.top+3-t.y?-5:-20,U.addClass("in-scrolling")):t.y>a.bottom-3?(l.top=5>t.y-a.bottom+3?5:20,U.addClass("in-scrolling")):l.top=0,0===l.top&&0===l.left?n():o()}})}function w(t,o){function n(e,t){S.scrollTop(S.scrollTop()-t),S.scrollLeft(S.scrollLeft()-e),d()}function r(){b=!0}function l(){b=!1}function i(e){return e.originalEvent.targetTouches?e.originalEvent.targetTouches[0]:e.originalEvent}function a(e){var t=e.originalEvent;return t.targetTouches&&1===t.targetTouches.length?!0:t.pointerType&&"mouse"!==t.pointerType?!0:!1}function c(e){if(a(e)){h=!0;var t=i(e);p.pageX=t.pageX,p.pageY=t.pageY,f=(new Date).getTime(),null!==g&&clearInterval(g),e.stopPropagation()}}function s(e){if(!b&&h&&a(e)){var t=i(e),o={pageX:t.pageX,pageY:t.pageY},r=o.pageX-p.pageX,l=o.pageY-p.pageY;n(r,l),p=o;var c=(new Date).getTime(),s=c-f;s>0&&(v.x=r/s,v.y=l/s,f=c),e.stopPropagation(),e.preventDefault()}}function u(){!b&&h&&(h=!1,clearInterval(g),g=setInterval(function(){return.01>Math.abs(v.x)&&.01>Math.abs(v.y)?(clearInterval(g),void 0):(n(30*v.x,30*v.y),v.x*=.8,v.y*=.8,void 0)},10))}var p={},f=0,v={},g=null,b=!1,h=!1;t&&(e(window).bind(j("touchstart"),r),e(window).bind(j("touchend"),l),S.bind(j("touchstart"),c),S.bind(j("touchmove"),s),S.bind(j("touchend"),u)),o&&(window.PointerEvent?(e(window).bind(j("pointerdown"),r),e(window).bind(j("pointerup"),l),S.bind(j("pointerdown"),c),S.bind(j("pointermove"),s),S.bind(j("pointerup"),u)):window.MSPointerEvent&&(e(window).bind(j("MSPointerDown"),r),e(window).bind(j("MSPointerUp"),l),S.bind(j("MSPointerDown"),c),S.bind(j("MSPointerMove"),s),S.bind(j("MSPointerUp"),u)))}function m(){S.bind(j("scroll"),function(){d()})}function T(){S.unbind(j()),e(window).unbind(j()),e(A).unbind(j()),S.data("perfect-scrollbar",null),S.data("perfect-scrollbar-update",null),S.data("perfect-scrollbar-destroy",null),O.remove(),Q.remove(),K.remove(),U.remove(),K=U=O=Q=M=Y=P=x=D=C=E=X=R=q=B=k=W=z=F=G=I=j=null}function y(){d(),m(),u(),p(),b(),h(),v(),(N||V)&&w(N,V),L.useKeyboard&&g(),S.data("perfect-scrollbar",S),S.data("perfect-scrollbar-update",d),S.data("perfect-scrollbar-destroy",T)}var L=e.extend(!0,{},o),S=e(this);if("object"==typeof n?e.extend(!0,L,n):l=n,"update"===l)return S.data("perfect-scrollbar-update")&&S.data("perfect-scrollbar-update")(),S;if("destroy"===l)return S.data("perfect-scrollbar-destroy")&&S.data("perfect-scrollbar-destroy")(),S;if(S.data("perfect-scrollbar"))return S.data("perfect-scrollbar");S.addClass("ps-container");var P,x,D,C,M,E,X,Y,k,W,I="rtl"===S.css("direction"),j=r(),A=this.ownerDocument||document,K=e("<div class='ps-scrollbar-x-rail'>").appendTo(S),O=e("<div class='ps-scrollbar-x'>").appendTo(K),R=t(K.css("bottom")),q=R===R,B=q?null:t(K.css("top")),H=t(K.css("borderLeftWidth"))+t(K.css("borderRightWidth")),U=e("<div class='ps-scrollbar-y-rail'>").appendTo(S),Q=e("<div class='ps-scrollbar-y'>").appendTo(U),z=t(U.css("right")),F=z===z,G=F?null:t(U.css("left")),J=t(U.css("borderTopWidth"))+t(U.css("borderBottomWidth")),N="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,V=null!==window.navigator.msMaxTouchPoints;return y(),S})}});


(function($) {
    "use strict";
    function main() {
        mobilecheck();
        mdselect();
        Learning();
        scrollStyle();
        //
        // $(".feature-slider").owlCarousel({
        //     autoPlay: 10000,
        //     items: 4,
        //     itemsDesktop : [1199,4],
        //     itemsDesktopSmall : [979,3],
        //     itemsTablet: [768,2],
        //     itemsTabletSmall: [600,1],
        //     slideSpeed: 300,
        //     navigation: true,
        //     pagination: false,
        //     navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        // });



        $('.view-grid').on('click', function() {
            $('.categories-content .content').attr('class', 'content grid');
            $('.grid').addClass('fade-1');
            $('.list').removeClass('fade-2');
            $(this).addClass('active');
            $('.view-list').removeClass('active');
        });
        $('.view-list').on('click', function() {
            $('.categories-content .content').attr('class', 'content list');
            $('.list').addClass('fade-2');
            $('.grid').removeClass('fade-1');
            $(this).addClass('active');
            $('.view-grid').removeClass('active');
        });


        /*==============================
         Account info
         ==============================*/

        var $toggleList = $('.list-account-info .list-item .toggle-list');
        $('html').on('click', function() {
            $toggleList.stop().removeClass('toggle-message-add');
            $('.list-account-info .item-click').stop().removeClass('active-ac');
        });
        $('.list-account-info .list-item').on('click', function(event) {
            event.stopPropagation();
        });
        $('.list-account-info .item-click').on('click', function(event) {
            if ($(this).hasClass('active-ac') == false) {
                $('.list-account-info .item-click').removeClass('active-ac');
                $toggleList.stop().removeClass('toggle-message-add');
            }
            $(this).toggleClass('active-ac');
            $(this).siblings('.toggle-list')
                .stop()
                .toggleClass('toggle-message-add');

        });

        $.each($('.content-bar'), function() {
            var widthList = $(this).find('li').outerWidth(),
                totalList = $(this).find('li').length;
            $(this).find('ul').width(widthList * totalList + 20);
        });


        /*==============================
         PROGRESS BAR
         ==============================*/
        $('.current-progress').appear(function () {
            $('.current-progress .progress-run').addClass('progress-run-add');
            var percent = $('.current-progress .count').text();
            $('.progress-run-add').width(percent);
        });


        /*==============================
         PERCENT LEARN
         ==============================*/
        $('.percent-learn').appear(function () {
            $(this)
                .siblings('.percent-learn-bar')
                .find('.percent-learn-run')
                .addClass('percent-learn-run-add');
            var percentLearn = $(this).text();
            var context = $(this).siblings('.percent-learn-bar').find('.percent-learn-run-add');
            context.width(percentLearn);
        });


        /*==============================
         CHECKOUT
         ==============================*/
        var current_fs, next_fs, previous_fs;
        var left, opacity, scale;
        var animating;
        $(".form-checkout .next").on('click', function() {
            if(animating) return false;
            animating = true;

            current_fs = $(this).closest('fieldset');
            next_fs = $(this).closest('fieldset').next();

            $(".form-checkout #bar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    left = (now * 50)+"%";
                    opacity = 1 - now;
                    current_fs.css({'opacity': '0'});
                    next_fs.css({'left': left, 'opacity': opacity});
                },
                duration: 800,
                complete: function(){
                    current_fs.hide();
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".submit").on('click', function() {
            return false;
        });
        formCheckoutCal();

        $('#page-wrap').append('<div class="overlayForm"></div>');
        $('.take-this-course').on('click', function() {
            $('.form-checkout, .overlayForm').fadeIn(400);
            return false;
        });

        $('.closeForm').on('click', function() {
            $('.form-checkout, .overlayForm').fadeOut(400);
        });
        $('.closeForm').click();

        /*==============================
         TABS STYLE LINE
         ==============================*/
        if ($('.nav-tabs').length) {
            $.each($('.nav-tabs'), function() {
                var tabsItem = $(this).find('a'),
                    tabs = $(this),
                    leftActive = tabs.find('.active').children('a').position().left,
                    widthActive = tabs.find('.active').children('a').width();
                tabs.append('<li class="tabs-hr"></li>');
                $('.tabs-hr').css({
                    left: leftActive,
                    width: widthActive
                });
                tabsItem.on('click', function() {
                    var left = $(this).position().left,
                        width = $(this).width();
                    $('.tabs-hr').animate({
                        left: left,
                        width: width
                    }, 500, 'easeInOutExpo');
                });
            });
        }

        /*==============================
         FOOTER STYLE 2
         ==============================*/
        var $footerStyle2 = $('footer#footer.footer-style-2'),
            heightFooter =  $footerStyle2.height();
        $footerStyle2.appendTo('body');
        $footerStyle2.siblings('#page-wrap').css('marginBottom', heightFooter);


        $('.question-sidebar ul, .list-message, .list-notification').wrap('<div class="list-wrap"></div>');
    }
    /*==============================
     Mobile check
     ==============================*/
    function mobilecheck() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return false;
        }
        return true;
    }

    function formCheckoutCal() {
        var heightWindow = $(window).height(),
            heightForm = $('.form-checkout .container').height(),
            formMiddle = (heightWindow - heightForm) / 2;
        $('.form-checkout').css('top', formMiddle);
        $('.form-checkout .form-body').height($(".form-checkout fieldset").height());
    }

    /*==============================
     MC SELECT
     ==============================*/
    function mdselect() {
        $('.mc-select').find('select.select').each(function() {
            var selected = $(this).find('option:selected').text();
            $(this)
                .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
                .after('<span class="select">' + selected + '</span>' + '<i class="fa fa-angle-down"></i>')
                .change(function(){
                    var val = $('option:selected',this).text();
                    $(this).next().text(val);
                });
        });
    }

    /*==============================
     Learning
     ==============================*/
    function Learning() {
        var $navListBody = $('.top-nav-list').find('.list-item-body');
        var width = $navListBody.closest('.top-nav-list').width() - 1;
        $navListBody.width(width);
        if ($('.top-nav-list').children('li').hasClass('active')) {
            $('.learning-section')
                .toggleClass('learning-section-fly')
                .css('paddingRight', width);
        }
        $('.top-nav-list').find('.outline-learn, .discussion-learn, .note-learn').on('click', '> a', function(e) {
            e.preventDefault();
            if ($(this).parent().hasClass('active') == false) {
                $('.top-nav-list').children('li').removeClass('active');
            }
            $(this).parent().toggleClass('active');
            if ($(this).parent().hasClass('active')) {
                $('.learning-section')
                    .toggleClass('learning-section-fly')
                    .css('paddingRight', width);
            } else {
                $('.learning-section')
                    .removeClass('learning-section-fly')
                    .css('paddingRight', '0');
            }
        });
        $('html').on('click', function() {
            $navListBody.removeClass('item-fly');
            $navListBody.parent('li').removeClass('active');
            $('.learning-section')
                .removeClass('learning-section-fly')
                .css('paddingRight', '0');
        });
        $('.top-nav-list, .list-item-body').on('click', function(event) {
            event.stopPropagation();
        });
    }
    function setHeightRespon() {
        var windowHeight = $(window).height(),
            w = window.innerWidth;
        $('.learn-section').css('min-height', windowHeight);

        if (w < 992) {
            $('.question-content-wrap').find('.question-sidebar').height('auto');
            $('.question-content-wrap').find('.score-sb').find('.list-wrap').height('auto').css('max-height', '300px');
        } else if (w >= 992) {
            var height = $('.question-content-wrap').find('.question-content').height() + 30;
            var heightUl = height - 90;
            $('.question-content-wrap').find('.score-sb').find('.list-wrap').height(heightUl).css('max-height', 'none');
            $('.question-content-wrap').find('.question-sidebar').height(height);
        }
    }

    /*==============================
     SET HEIGHT MESSAGE SB
     ==============================*/
    function setHeightMessagesb() {
        if ($('.list-item-body').length) {
            var heightlist = $(window).height() - $('.list-item-body').css('margin-top').split('px')[0];
            $('.list-item-body').height(heightlist);
        }
    }



    /*==============================
     SCROLL STYLE
     ==============================*/
    function scrollbar() {
        var $scrollbar = $('.question-sidebar .list-wrap, .messages .list-wrap, .message-sb .list-wrap, .notification .list-wrap, .list-item-body, .table-wrap .tbody');
        $scrollbar.perfectScrollbar({
            maxScrollbarLength: 150,
        });
        $scrollbar.perfectScrollbar('update');

        $('.content-bar').perfectScrollbar({
            maxScrollbarLength: 150,
            suppressScrollY: true,
            useBothWheelAxes: true,
        });
        $('.content-bar').perfectScrollbar('update');
    }
    function scrollStyle() {
        scrollbar();
        $(window).on('load', function() {
            if ($('.content-bar').length > 0) {
                var  currentPosition =$('.content-bar').find('.current').position().left;
                var  prevCurrentWidth =$('.content-bar').find('.current').prev().width();
                setTimeout(function() {
                    $('.content-bar').animate({
                        scrollLeft: currentPosition - prevCurrentWidth
                    }, 400);
                }, 100);
            }
        });
    }

    function uploadFile() {
        $('.up-file').delegate('a', 'click', function(e) {
            e.preventDefault();
            $(this).siblings('input[type="file"]').trigger('click');
        });
        $('.up-file').delegate('input[type="file"]', 'change', function() {
            var nameFile = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
            $(this).siblings('input[type="hidden"]').val(nameFile);
            readURL(this);
        });
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.changes-avatar')
                        .find('img')
                        .attr('src', e.target.result)
                        .width(140);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    }



    /*==========  Slider Home ==========*/
    function SliderHome(){
        if($('#slide-home').length){
            $('#slide-home').owlCarousel({
                autoPlay: 10000,
                navigation: false,
                pagination: true,
                singleItem: true,
                mouseDrag:false,
                addClassActive:true,
                transitionStyle:'fade'
            });
        }
    }

    /*==========  Resize Slider Home ==========*/
    function ResizeSliderHome() {
        if($('#slide-home')) {
            var parentWidth = $('.slide-cn').innerWidth(),
              imgWidth = $('.item-inner').width(),
              imgHeight = $('.item-inner').height();
            console.log(imgHeight);
            if(imgHeight<256) imgHeight=812;
              var scale = parentWidth/imgWidth,
              ratio = imgWidth/imgHeight,
              heightItem = parentWidth/ratio;
          $('.slide-item').css({'height': heightItem});

            if ($(window).width() <= 1200) {

                $('.item-inner').css({
                    '-webkit-transform': 'scale(' + scale + ')',
                    '-moz-transform': 'scale(' + scale + ')',
                    '-ms-transform': 'scale(' + scale + ')',
                    'transform': 'scale(' + scale + ')'
                });

            } else {

                $('.item-inner').css({
                    '-webkit-transform': 'scale(1)',
                    '-moz-transform': 'scale(1)',
                    '-ms-transform': 'scale(1)',
                    'transform': 'scale(1)'
                });

            }
        }
    }


    $(document).ready(function() {
        main();
        setHeightRespon();
        uploadFile();
        setHeightMessagesb();
        scrollbar();
        $('.nav-tabs').wrap('<div class="nav-tabs-wrap"></div>');

        if (window.innerWidth < 1200) {
            $('.menu-item-has-children').on('click', '> a', function(evt) {
                evt.preventDefault();
                $(this).next().slideToggle(300);
                $(this).toggleClass('mobile-active');
            });
            $('.open-menu').on('click', function() {
                $(this).toggleClass('toggle-active');
                $('.navigation .menu, .search-box').slideToggle(300);
            });
            $('html').on('click', function() {
                $('.open-menu').removeClass('toggle-active');
                $('.navigation .menu, .search-box').slideUp(300);
            });
            $('.navigation .menu, .open-menu, .search-box').on('click', function(evt) {
                evt.stopPropagation();
            });
        }
    });
    $(window).load(function() {
        ResizeSliderHome();
    });

    $(window).on('resize', function() {
        setHeightRespon();
        setHeightMessagesb();
        scrollbar();
        SliderHome();
        formCheckoutCal();
        ResizeSliderHome();
    }).trigger('resize');;


})(jQuery);