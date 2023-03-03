/* global $ */
document.addEventListener('DOMContentLoaded',function(){
  $('.recent-reviews').each(function(){
    var $reviews = $('.recent-reviews__slide', this);

    $('.js-next', this).on('click', function() {
      $reviews.slick('slickNext');
    });
    $('.js-prev', this).on('click', function() {
      $reviews.slick('slickPrev');
    });

    $reviews.slick({
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });
  });
});