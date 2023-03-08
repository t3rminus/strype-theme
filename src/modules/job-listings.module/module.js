/* global $ */

function sortUnique(arr) {
  return arr.filter(function(v, i, a) { return a.indexOf(v) === i; }).sort();
}

document.addEventListener('DOMContentLoaded',function(){
  $('.job-listings__filters').each(function() {
    var $this = $(this);
    var $joblistings = $this.closest('.job-listings');

    var locations = {};
    $joblistings.find('[data-location]').each(function() {
      var $this = $(this);
      var prov = $this.attr('data-province');
      var loc = $this.attr('data-location');
      if(!locations[prov]) {
        locations[prov] = [loc];
      } else {
        locations[prov].push(loc);
      }
    });

    var $locationSelect = $('.js-location', $joblistings);
    Object.keys(locations).sort().forEach(function (prov) {
      $locationSelect.append('<option>'+prov+'</option>');
      sortUnique(locations[prov]).forEach(function(loc) {
        $locationSelect.append('<option value="'+loc+'"> &nbsp; &nbsp;'+loc+'</option>');
      });
    });

    var seniority = [];
    $joblistings.find('[data-seniority]').each(function() {
      seniority.push($(this).attr('data-seniority'));
    });

    var $senioritySelect = $('.js-seniority', $joblistings);
    sortUnique(seniority).forEach(function(sen) {
      $senioritySelect.append('<option>'+sen+'</option>');
    });

    var category = [];
    $joblistings.find('[data-category]').each(function() {
      category.push($(this).attr('data-category'));
    });

    var $categorySelect = $('.js-category', $joblistings);
    sortUnique(category).forEach(function(cat) {
      $categorySelect.append('<option>'+cat+'</option>');
    });

    var $searchInput = $('.js-search', $joblistings);

    var doFiltering = function() {
      var search = $searchInput.val().replace(/(^\s+|\s+$)/, '');
      var category = $categorySelect.val().replace(/(^\s+|\s+$)/, '');
      var location = $locationSelect.val().replace(/(^\s+|\s+$)/, '');
      var seniority = $senioritySelect.val().replace(/(^\s+|\s+$)/, '');

      var listings = $('.js-listing', $joblistings).hide();
      if(search) {
        var searchParts = search.split(/\s+/);
        listings = listings.filter(function() {
          var text = $(this).text();
          return searchParts.some(function(part) { return (new RegExp(part, 'i')).test(text); });
        });
        console.log(searchParts);
      }
      if(location) {
        listings = listings.filter(function() {
          var $this = $(this);
          return $this.attr('data-province') === location ||  $this.attr('data-location') === location;
        });
      }
      if(category) {
        listings = listings.filter(function() {
          var $this = $(this);
          return $this.attr('data-category') === category;
        });
      }
      if(seniority) {
        listings = listings.filter(function() {
          var $this = $(this);
          return $this.attr('data-seniority') === seniority;
        });
      }
      listings.show();
    };

    $locationSelect.on('change', doFiltering);
    $categorySelect.on('change', doFiltering);
    $senioritySelect.on('change', doFiltering);
    $searchInput.on('keyup', doFiltering);

    // Show the filters
    $this.attr('style', '');
  });
});