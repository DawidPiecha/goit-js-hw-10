import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_eDHiN2rSnzJuJSkEDuXXd7OxcJbeRLmSbUBm2vMfrnqK09NGtigSdKL615eDBnWv';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelectElement = document.querySelector('select.breed-select');
const containerWithCatInfo = document.querySelector('.cat-info');
const loadingMessage = document.querySelector('p.loader');
const errorMessage = document.querySelector('.error');

window.addEventListener('load', () => {
  Notiflix.Loading.dots(loadingMessage.textContent, {
    backgroundColor: 'rgba(0,0,0,0.8)',
    svgSize: '500px',
  });

  fetchBreeds()
    .then(breeds => {
      new SlimSelect({
        select: breedSelectElement,
        data: breeds.map(breed => ({
          value: breed.id,
          text: breed.name,
        })),
      });
    })
    .catch(error => {
      console.log('fetchBreeds window-loading error:', error);
      Notiflix.Notify.failure(errorMessage.textContent);
    });
});

breedSelectElement.addEventListener('change', event => {
  const breedId = event.target.value;
  Notiflix.Loading.dots(loadingMessage.textContent, {
    backgroundColor: 'rgba(0,0,0,0.8)',
    svgSize: '500px',
  });

  fetchCatByBreed(breedId)
    .then(catData => {
      Notiflix.Loading.remove();

      const [cat] = catData;

      containerWithCatInfo.innerHTML = `
        <img src="${cat.url}" alt="Picture of a cat :${cat.breeds[0].name}">
        <div class="characteristics">
          <h2>${cat.breeds[0].name}</h2>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      console.log('fetchBreedsById event error:', error);
      Notiflix.Notify.failure(errorMessage.textContent);
    });
});
