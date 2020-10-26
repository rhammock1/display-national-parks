// need to display list of national parks in a state


const displayResults = function(responseJson) {
  //should display parks full name, description, and website url
  //this function will contain template to go in #results-list
  //for loop to append ea list item element
  console.log(responseJson);
  $('#results-list').empty();
  for(let i =0;i<responseJson.data.length;i++) {
    $('#results-list').append(`
    <li><a href='${responseJson.data[i].url}' target='_blank'><h3>${responseJson.data[i].fullName}</h3></a>
    <p>${responseJson.data[i].description}</p>
    `)
  };
  $('#results').removeClass('hidden');
}

const formatQueryParams = function(params) {
  // will take the stateCode and limit
  //map encode and join params with &
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);

  return queryItems.join('&');
}
const getStateParks = function(state, maxResults) {
//variable for search url
//parameters object
// formatQueryParams(params)
  let apiKey = 'LFKrHTeEryZDB8iI39ebwsdrxI6TNUJoEu6zZbID';
  let searchURL = 'https://developer.nps.gov/api/v1/parks';

  //just need to accept multiple values
  const params = {
  stateCode: state,
  limit: maxResults,
  api_key: apiKey
  }
  console.log(params);
  
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url).then(response => {
     return response.json();
    }).then(responseJson => displayResults(responseJson));
}

const watchForm = function() {
  //need event listener
  // need to assign val to variable
  $('#js-form').on('submit', function(event) {
    event.preventDefault();
    let stateCode = $('#js-state').val();
    console.log(stateCode);
  
    let limit = $('#js-max-results').val();
    getStateParks(stateCode, limit);
    $('#js-state').val('');
  });
  // getStateParks(value)
  // clear input
}

const startUp = function() {
  watchForm();
}

$(startUp);