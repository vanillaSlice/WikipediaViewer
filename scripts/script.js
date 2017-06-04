$(document).ready(function () {
  
  "use strict";
  
  $("#search-button").click(function (event) {
    console.log("seearch button clicked");
  });
  
  $("#random-button").click(function (event) {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
  
});