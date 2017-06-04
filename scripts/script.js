$(document).ready(() => {
  
  "use strict";
  
  const randomURL = "https://en.wikipedia.org/wiki/Special:Random";
  const queryURL = "https://en.wikipedia.org/w/api.php?action=query&" +
                   "prop=extracts&exintro=true&exchars=250&generator=" +
                   "search&format=json&gsrsearch=";
  
  $("#search-button").click(() => {
    $("#search-button").attr('disabled','disabled');
    $("#search-form-container").fadeIn().removeClass("hidden");
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
        $("#results-container").empty();
        var pages = data.query.pages;
        for (let page in pages) {
          $(("<div class='search-result'>" + pages[page].extract + "</div>")).addClass("hidden").appendTo("#results-container");
        }
        $(".search-result").each(function (index) {
          $(this).delay(index * 500).removeClass("hidden").fadeIn();
        });
        $("#results-container").removeClass("hidden");
      }
    });
  };
  
});