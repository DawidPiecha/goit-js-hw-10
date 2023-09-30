import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_eDHiN2rSnzJuJSkEDuXXd7OxcJbeRLmSbUBm2vMfrnqK09NGtigSdKL615eDBnWv';
import Notiflix from 'notiflix';

const errorMessage = document.querySelector('.error');

const fetchBreeds = () => {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';
  return axios
    .get(apiUrl)
    .then(response => {
      const data = response.data;
      console.log('Dane o rasach kotów:', data);
      return data;
    })
    .catch(error => {
      const errorMessageText = `${errorMessage.textContent} ${error}`;
      Notiflix.Notify.failure(errorMessageText);
    });
};
const fetchCatByBreed = breedId => {
  const apiUrlWithId = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(apiUrlWithId)
    .then(response => {
      const data = response.data;
      console.log('Dane :', data);
      return data;
    })
    .catch(error => {
      const errorMessageText = `${errorMessage.textContent} ${error}`;
      Notiflix.Notify.failure(errorMessageText);
    });
};

export { fetchBreeds, fetchCatByBreed };
