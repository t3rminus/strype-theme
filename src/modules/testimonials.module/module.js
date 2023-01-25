/* global $ */
document.addEventListener('DOMContentLoaded',function(){
  $('.testimonials').each(function(){
    var id = $(this).closest('.hs_cos_wrapper_type_module').attr('id');
    var $content = $('.testimonials__content', this);
    var $nav = $('.testimonials__nav', this);


    $('.js-next', this).on('click', function() {
      $content.slick('slickNext');
    });
    $('.js-prev', this).on('click', function() {
      $content.slick('slickPrev');
    });

    $nav.on('init reInit', function() {
      $nav.toggleClass('slick-few', $('.slick-slide:not(.slick-cloned)', this).length <= 5);
    });

    $nav.slick({
      arrows: false,
      dots: false,
      infinite: true,
      focusOnSelect: true,
      asNavFor: '#' + id + ' .testimonials__content',
      slidesToShow: 1,
      centerPadding: '0',
      mobileFirst: true,
      centerMode: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5
          }
        }
      ]
    });
    $content.slick({ 
      arrows: false,
      dots: false,
      asNavFor: '#' + id + ' .testimonials__nav'
    });
  });
})