$(document).ready(function () {

  "use strict";

  var randomURL = "https://en.wikipedia.org/wiki/Special:Random",
    queryURL = "https://en.wikipedia.org/w/api.php?action=query" +
    "&prop=extracts&exintro=true&exsentences=1&explaintext=true" +
    "&generator=search&format=json&gsrsearch=",
    wikipediaURL = "https://en.wikipedia.org/wiki/",
    searchButton = $("#search-button"),
    searchBox = $("#search-box"),
    resultsContainer = $("#results-container");

  searchButton.click(function () {
    searchButton.attr("disabled", true);
    $("#search-form-container").addClass("animated fadeIn").removeClass("hidden");
  });

  $("#random-button").click(function () {
    window.open(randomURL);
  });

  $("#search-form").submit(function (event) {
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
      "id": "results",
      "class": "animated slideInUp"
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
          $("<a class='search-result' href='" + href + "' target='_blank'>" +
            "<div><h2>" + page.title + "</h2><p>" + page.extract + "</p></div>" +
            "</a>").appendTo(results);
        }
      }
    }
  }

  function handleError(error) {
    console.error(error);
  }

});