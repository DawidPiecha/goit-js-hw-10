import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelectElement = document.querySelector('select.breed-select');
const containerWithCatInfo = document.querySelector('.cat-info');
const loadingMessage = document.querySelector('p.loader');
const errorMessage = document.querySelector('.error');
let select;

window.addEventListener('load', () => {
  Notiflix.Loading.dots(loadingMessage.textContent, {
    backgroundColor: 'rgba(0,0,0,0.8)',
    svgSize: '200px',
  });
  fetchBreeds().then(breeds => {
    Notiflix.Loading.remove();

    select = new SlimSelect({
      select: breedSelectElement,
      data: breeds.map(breed => ({
        value: breed.id,
        text: breed.name,
      })),
    });
  });
});

breedSelectElement.addEventListener('change', event => {
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(catData => {
      containerWithCatInfo.innerHTML = `
        <img src="${catData.url}" alt="${catData.breeds[0].name}">
        <div class="characteristics">
          <h2>${catData.breeds[0].name}</h2>
          <p><strong>Opis:</strong> ${catData.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      const errorMessageText = `${errorMessage.textContent} ${error}`;
      Notiflix.Notify.failure(errorMessageText);
    });
});
