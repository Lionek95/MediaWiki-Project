// https://www.mediawiki.org/w/api.php
// https://www.mediawiki.org/wiki/API:Query

const form = document.querySelector('.searchTerm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('.searchInput').value;
  const searchQuery = input.trim();
  fetchResults(searchQuery);
}

// Downloading the image from the first search result
function fetchImage(searchQuery){
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${searchQuery}&origin=*`;
    fetch(endpoint)
    .then(function(response){return response.json();})
    .then(function(response) {
        const result = response.query.pages;
        const id = Object.keys(result)[0];
        if(result[id].original){
          const imgURL = result[id].original.source;
          console.log(imgURL); 
          displayImage(imgURL);
        }
})};

// More on using Wikipedia action=query https://www.mediawiki.org/wiki/API:Query
function fetchResults(searchQuery) {
	    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  	fetch(endpoint)
  		.then(function(response){return response.json();})
  		.then(function(response) {
  	  	const results = response.query.search;
        fetchImage(searchQuery);
        displayResults(results);
		})
      .catch(function(error){console.log(error);});
}

// Adding the image from the first search result in Wikipedia
function displayImage(imageURL){
  const searchResults = document.querySelector('.searchResults');
  searchResults.innerHTML += `<img src="${imageURL}"/width="600"  alt="">`;
}

// Displaying results on the page
function displayResults(results) {
    const searchResults = document.querySelector('.searchResults');
    searchResults.innerHTML = '';
    const result = results[0];
    const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

    searchResults.innerHTML +=
    `<div class="resultItem">
      <h2 class="resultItem-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
      </h2>
    </div>`;
}