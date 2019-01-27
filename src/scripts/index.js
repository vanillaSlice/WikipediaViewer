$(document).ready(function() {

  'use strict';

  /*
   * URLs.
   */
  var wikipediaURL = 'https://en.wikipedia.org/wiki/';
  var queryURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&exsentences=1&explaintext=true&generator=search&format=json&gsrsearch=';
  var randomURL = 'https://en.wikipedia.org/wiki/Special:Random';

  /*
   * DOM elements.
   */
  var searchBtnElement = $('.wiki-viewer__search-btn');
  var randomBtnElement = $('.wiki-viewer__random-btn');
  var searchFormContainerElement = $('.wiki-viewer__search-form-container');
  var searchFormElement = $('.wiki-viewer__search-form');
  var searchInputElement = $('.wiki-viewer__search-input');
  var resultsContainerElement = $('.wiki-viewer__results-container');

  // show search form on search button click
  searchBtnElement.click(function() {
    searchBtnElement.attr('disabled', true);
    searchFormContainerElement.addClass('animated fadeIn').removeClass('hidden');
  });

  // open random wiki entry on random button click
  randomBtnElement.click(function() {
    window.open(randomURL);
  });

  // perform search on search form submit
  searchFormElement.submit(function(event) {
    event.preventDefault();
    searchInputElement.blur();
    handleSearch();
  });

  function handleSearch() {
    $.ajax({
      dataType: 'jsonp',
      url: queryURL + encodeURIComponent(searchInputElement.val()),
      success: handleSuccess,
      error: handleError
    });
  }

  function handleSuccess(data) {
    // make sure we unhide the results container
    resultsContainerElement.empty().removeClass('hidden');

    // create div to append each search result to
    var results = $('<div class="animated slideInUp wiki-viewer__search-results">');

    results.appendTo(resultsContainerElement);

    // no results could be found
    if (!data.query || !data.query.pages) {
      results.append('No results returned');
      return;
    }
    
    // append each result to results
    var pages = data.query.pages;
    for (var key in pages) {
      if (pages.hasOwnProperty(key)) {
        var page = pages[key];
        var href = wikipediaURL + page.title.replace(" ", "_");

        results.append(
          '<a class="wiki-viewer__search-result" href="' + href + '" target="_blank">' +
            '<div>' + 
              '<h2>' + page.title + '</h2>' + 
              '<p class="wiki-viewer__search-result-extract">' + page.extract + '</p>' + 
            '</div>' +
          '</a>'
        );
      }
    }
  }

  function handleError(error) {
    console.error(error);
  }

});