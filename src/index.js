import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// const _ = require('lodash');
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchStr = document.querySelector('#search-box');

searchStr.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  let searchCountry = event.target.value.trim().toLowerCase();
  fetchCountries(searchCountry).then(renderCountryCard).catch(catchError);
}

function clearSearchResults() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountryCard(country) {
  if (country.length > 10) {
    clearSearchResults();
    catchWarning();
  } else if (country.length > 1) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = createCountryList(country);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = createCountryInfo(country[0]);
  }
}

function catchWarning() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function catchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createCountryList(country) {
  clearSearchResults();
  return country
    .map(
      ({ name, flags }) => `
      <li class="country-list-item"><img src="${flags.png}" alt="${name.official}" width="32">${name.official}</li>`
    )
    .join('');
}

function createCountryInfo(country) {
  const { name, flags, capital, population, languages } = country;
  return `
        <div class="country-info-main">
          <img src="${flags.svg}" alt="${name.official}" width=60 height=40>
          <h2>${name.official}</h2>
        </div>
        <div class="country-info-secondary">
          <p>Capital: ${capital} </p>
          <p>Population: ${population}</p>
          <p>Langueges: ${Object.values(languages)}</p>
        </div>
    `;
}

// searchStr.addEventListener(
//   'input',
//   _.debounce(() => {
//     const name = searchStr.value.trim().toLowerCase();
//     if (name.length === 0) {
//       return clearSearchResults();
//     }
//     fetchCountries(name).then(renderCountryCard).catch(catchError);
//   }, DEBOUNCE_DELAY)
// );
