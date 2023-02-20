/* global $ */
document.addEventListener('DOMContentLoaded',function(){
  $('.js-faq-toggle').on('click', function() {
      $(this).toggleClass('faqs--open').next().slideToggle();
  });
});