/* global $ */
document.addEventListener('DOMContentLoaded', function(){
  $('button.js-recent, button.js-popular').on('click', function() {
      $('.blog-sidebar-recent--active').removeClass('blog-sidebar-recent--active');
      if($(this).hasClass('js-recent')) {
        $('.js-recent').addClass('blog-sidebar-recent--active');
      } else {
        $('.js-popular').addClass('blog-sidebar-recent--active');
      }
  });
});