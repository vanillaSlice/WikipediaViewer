/*
 * URLs
 */
const wikipediaURL = 'https://en.wikipedia.org/wiki/';
const queryURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&exsentences=1&explaintext=true&generator=search&format=json&gsrsearch=';
const randomURL = 'https://en.wikipedia.org/wiki/Special:Random';

/*
 * DOM elements
 */
const searchBtnElement = $('.wiki-viewer__search-btn');
const randomBtnElement = $('.wiki-viewer__random-btn');
const searchFormContainerElement = $('.wiki-viewer__search-form-container');
const searchFormElement = $('.wiki-viewer__search-form');
const searchInputElement = $('.wiki-viewer__search-input');
const resultsContainerElement = $('.wiki-viewer__results-container');

// show search form on search button click
searchBtnElement.click(() => {
  searchBtnElement.attr('disabled', true);
  searchFormContainerElement.addClass('animated fadeIn').removeClass('hidden');
});

// open random wiki entry on random button click
randomBtnElement.click(() => {
  window.open(randomURL);
});

function handleSuccess(data) {
  // make sure we unhide the results container
  resultsContainerElement.empty().removeClass('hidden');

  // create div to append each search result to
  const results = $('<div class="animated slideInUp wiki-viewer__search-results">');

  results.appendTo(resultsContainerElement);

  // no results could be found
  if (!data.query || !data.query.pages) {
    results.append('No results returned');
    return;
  }

  // append each result to results
  const { pages } = data.query;
  Object.keys(pages).forEach((key) => {
    const page = pages[key];
    const href = wikipediaURL + page.title.replace(' ', '_');

    results.append(
      `<a class="wiki-viewer__search-result" href="${href}" target="_blank">`
      + '<div>'
      + `<h2>${page.title}</h2>`
      + `<p class="wiki-viewer__search-result-extract">${page.extract}</p>`
      + '</div>'
      + '</a>',
    );
  });
}

function handleError(error) {
  console.error(error);
}

function handleSearch() {
  $.ajax({
    dataType: 'jsonp',
    url: queryURL + encodeURIComponent(searchInputElement.val()),
    success: handleSuccess,
    error: handleError,
  });
}

// perform search on search form submit
searchFormElement.submit((event) => {
  event.preventDefault();
  searchInputElement.blur();
  handleSearch();
});
