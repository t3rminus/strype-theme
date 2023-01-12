(function() {
  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Execute JavaScript on document ready
  domReady(function () {
    document.dispatchEvent(new Event('init'));
  });
}());