" use strict ";

// get json data
let wordsById = {}
let request = new XMLHttpRequest();
request.open('GET', "data.json");
request.responseType = 'json';
request.send(); 

// digest and organise data
request.onload = function() {
    wordsById = request.response;

    // sort alphabetically
    wordsById.sort(function(a, b) {
      var textA = a.word.toUpperCase();
      var textB = b.word.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    // add id # to each word
    Object.keys(wordsById).forEach(function(key){ 
          wordsById[key].id = key;
    });

    // console.log(wordsById);
    miniSearch.addAll(wordsById)
    fillpage(wordsById);    
} 


// Setup MiniSearch
const miniSearch = new MiniSearch({
  fields: ['meaning', 'word'],
})

// Select DOM elements
const $output = document.querySelector('#output')
const $app = document.querySelector('.App')
const $search = document.querySelector('.Search')
const $searchInput = document.querySelector('.Search input')
const $clearButton = document.querySelector('.Search button.clear')
const $wordList = document.querySelector('.wordList')
const $suggestionList = document.querySelector('.SuggestionList')



// show json in output as html
function fillpage(wordsById) {
      Object.keys(wordsById).forEach(function(key){ 
        item = document.createElement('span');
        
        wordtag = document.createElement('h3');
        wordtag.innerHTML = String(wordsById[key].word)+':';

        meaningtag = document.createElement('p');
        meaningtag.innerHTML = String(wordsById[key].meaning);
        
        $output.appendChild(item);
        item.appendChild(wordtag);
        item.appendChild(meaningtag);

        //
        wordsById[key].id = key;
      });
}


// search bar update (add suggestions)
$searchInput.addEventListener('input', (event) => {
  const query = $searchInput.value

  const results = (query.length > 1) ? getSearchResults(query) : []
  renderSearchResults(results)

  const suggestions = (query.length > 1) ? getSuggestions(query) : []
  renderSuggestions(suggestions)
})

// clear search and suggestions
$clearButton.addEventListener('click', () => {
  $searchInput.value = ''
  $searchInput.focus()

  renderSearchResults([])
  renderSuggestions([])
})

// Clicking on a suggestion selects it
$suggestionList.addEventListener('click', (event) => {
  const $suggestion = event.target

  if ($suggestion.classList.contains('Suggestion')) {
    const query = $suggestion.innerText.trim()
    $searchInput.value = query
    $searchInput.focus()

    const results = getSearchResults(query)
    renderSearchResults(results)
    renderSuggestions([])
  }
})

// Pressing up/down/enter key while on search bar navigates through suggestions
$search.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowDown') {
    selectSuggestion(+1)
  } else if (key === 'ArrowUp') {
    selectSuggestion(-1)
  } else if (key === 'Enter' || key === 'Escape') {
    $searchInput.blur()
    renderSuggestions([])
  } else {
    return
  }
  const query = $searchInput.value
  const results = getSearchResults(query)
  renderSearchResults(results)
})

// Clicking outside of search bar clears suggestions
$app.addEventListener('click', (event) => {
  renderSuggestions([])
})


// Define functions and support variables
const searchOptions = {
  fuzzy: 0.2,
  prefix: true,
  fields: ['word', 'meaning'],
  combineWith: 'OR',
  filter: null
}

// get
const getSearchResults = (query) => {
  return miniSearch.search(query, searchOptions).map(({ id }) => wordsById[id])
}


// set
const getSuggestions = (query) => {
  return miniSearch.autoSuggest(query, { boost: { meaning: 5 } })
    .filter(({ suggestion, score }, _, [first]) => score > first.score / 4)
    .slice(0, 5)
}


// render
const renderSearchResults = (results) => {
  $wordList.innerHTML = results.map(({ meaning, word }) => {
    return `<li class="word">
      <h3>${capitalize(word)}</h3>
      <dl>
        <dt>Meaning:</dt> <dd>${capitalize(meaning)}</dd>
      </dl>
    </li>`
  }).join('\n')

  if (results.length > 0) {
    $app.classList.add('hasResults')
  } else {
    $app.classList.remove('hasResults')
  }
}

// render suggestions
const renderSuggestions = (suggestions) => {
  $suggestionList.innerHTML = suggestions.map(({ suggestion }) => {
    return `<li class="Suggestion">${suggestion}</li>`
  }).join('\n')

  if (suggestions.length > 0) {
    $app.classList.add('hasSuggestions')
  } else {
    $app.classList.remove('hasSuggestions')
  }
}

// sel
const selectSuggestion = (direction) => {
  const $suggestions = document.querySelectorAll('.Suggestion')
  const $selected = document.querySelector('.Suggestion.selected')
  const index = Array.from($suggestions).indexOf($selected)

  if (index > -1) {
    $suggestions[index].classList.remove('selected')
  }

  const nextIndex = Math.max(Math.min(index + direction, $suggestions.length - 1), 0)
  $suggestions[nextIndex].classList.add('selected')
  $searchInput.value = $suggestions[nextIndex].innerText
}


const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())
