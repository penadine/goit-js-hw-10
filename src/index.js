import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('select.breed-select');
const loaderElement = document.querySelector('p.loader');
const errorElement = document.querySelector('p.error');
const catInfoDiv = document.querySelector('.cat-info');

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function showCatInfo(cat) {
  catInfoDiv.innerHTML = `
    <img src="${cat[0].url}" alt="${cat[0].breeds[0].name}">
    <div class="text-info">
      <h1>${cat[0].breeds[0].name}</h1>
      <p>${cat[0].breeds[0].description}</p>
      <p>Temperament: ${cat[0].breeds[0].temperament}</p>
    </div>
  `;

  breedSelect.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  breedSelect.style.display = 'none';
  loaderElement.style.display = 'block';
  loaderElement.textContent = 'Loading data, please wait...';
  errorElement.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);

      breedSelect.style.display = 'block';
      loaderElement.style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      errorElement.style.display = 'block';
      errorElement.textContent = 'Error loading data.';
      loaderElement.style.display = 'none';
    });
});


breedSelect.addEventListener('change', () => {
  loaderElement.style.display = 'block';
  loaderElement.textContent = 'Loading cat information...';
  errorElement.style.display = 'none';
  catInfoDiv.innerHTML = '';

  fetchCatByBreed(breedSelect.value)
    .then(cat => {
      showCatInfo(cat);
      loaderElement.style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      errorElement.style.display = 'block';
      errorElement.textContent = 'Error loading cat information.';
      loaderElement.style.display = 'none';
    });
});