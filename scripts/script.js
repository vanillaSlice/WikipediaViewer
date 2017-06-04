$(document).ready(() => {
  
  "use strict";
  
  const randomURL = "https://en.wikipedia.org/wiki/Special:Random";
  const queryURL = "https://en.wikipedia.org/w/api.php?action=query&" +
                   "prop=extracts&exintro=true&exchars=250&generator=" +
                   "search&format=json&gsrsearch=";
  
  $("#search-button").click(() => {
    $("#search-button").attr("disabled", true);
    $("#search-form-container").addClass("animated fadeIn").removeClass("hidden");
  });
  
  $("#random-button").click(() => window.open(randomURL));
  
  $("#search-form").submit(e => {
    e.preventDefault();
    $("#search-box").blur();
    handleSearch();
  });
  
  var handleSearch = () => {
    $.ajax({
      dataType: "jsonp",
      url: queryURL + encodeURIComponent($("#search-box").val()),
      success: function(data) {
        var resultsContainer = $("#results-container");
        resultsContainer.empty().removeClass("hidden");
        var results = $("<div>", {"id": "results", "class": "animated slideInUp"});
        results.appendTo(resultsContainer);
        var pages = data.query.pages;
        for (let page in pages) {
          $("<div class='search-result' tabindex='0'><h2>" + pages[page].title + "</h2><p>" + pages[page].extract + "</p></div>").appendTo(results);
        }
      }
    });
  };
  
});