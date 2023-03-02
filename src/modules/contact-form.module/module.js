/* global $ */
document.addEventListener('DOMContentLoaded', function(){
  $('.hs-form .hs-submit .hs-button[type=submit]').each(function() {
      var $this = $(this);
      var classes = $this.attr('class');
      var text = $this.attr('value');
      $('<button />').html(text).attr('class', classes).insertAfter($this);
  });
});