$(document).ready(function () {

  "use strict";

  var randomURL = "https://en.wikipedia.org/wiki/Special:Random",
    queryURL = "https://en.wikipedia.org/w/api.php?action=query" +
    "&prop=extracts&exintro=true&exsentences=1&explaintext=true" +
    "&generator=search&format=json&gsrsearch=",
    wikipediaURL = "https://en.wikipedia.org/wiki/",
    searchButton = $('.wiki-viewer__search-btn'),
    searchBox = $('.wiki-viewer__search-input'),
    resultsContainer = $('.wiki-viewer__results-container');

  searchButton.click(function () {
    searchButton.attr("disabled", true);
    $('.wiki-viewer__search-form-container').addClass("animated fadeIn").removeClass("hidden");
  });

  $('.wiki-viewer__random-btn').click(function () {
    window.open(randomURL);
  });

  $('.wiki-viewer__search-form').submit(function (event) {
    event.preventDefault();
    searchBox.blur();
    handleSearch();
  });

  function handleSearch() {
    $.ajax({
      dataType: "jsonp",
      url: queryURL + encodeURIComponent(searchBox.val()),
      success: handleSuccess,
      error: handleError
    });
  }

  function handleSuccess(data) {
    resultsContainer.empty().removeClass("hidden");

    var results = $("<div>", {
      "class": "animated slideInUp wiki-viewer__search-results"
    });
    results.appendTo(resultsContainer);

    if (data.query === undefined || data.query.pages === undefined) {
      results.append("No results returned");
    } else {
      var pages = data.query.pages;
      for (var key in pages) {
        if (pages.hasOwnProperty(key)) {
          var page = pages[key],
            href = wikipediaURL + page.title.replace(" ", "_");
          $("<a class='wiki-viewer__search-result' href='" + href + "' target='_blank'>" +
            "<div><h2>" + page.title + "</h2><p class='wiki-viewer__search-result-extract'>" + page.extract + "</p></div>" +
            "</a>").appendTo(results);
        }
      }
    }
  }

  function handleError(error) {
    console.error(error);
  }

});