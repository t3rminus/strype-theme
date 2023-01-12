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

    $nav.on('init reInit', function(e) {
      $nav.toggleClass('slick-few', $('.slick-slide:not(.slick-cloned)', this).length <= 5);
    });

    $nav.slick({
      arrows: false,
      dots: false,
      centerMode: true,
      infinite: true,
      focusOnSelect: true,
      centerPadding: '0',
      slidesToShow: 5,
      asNavFor: '#' + id + ' .testimonials__content'
    });
    $content.slick({ 
      arrows: false,
      dots: false,
      asNavFor: '#' + id + ' .testimonials__nav'
    });
  });
})