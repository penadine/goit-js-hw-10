const BASE_URL = 'https://api.thecatapi.com/';

const APIKEY = 'live_QwPwWnhBEPwRscr3QqS9yuc0WNQZTxGdGJQCqzXbZcqYhrKZHGn0epIqnUJ1qMHp'

export function fetchBreeds() {
  return fetch(`${BASE_URL}v1/breeds?api_key=${APIKEY}`).then(response => {
    return response.json();
  })

}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}v1/images/search?breed_ids=${breedId}&api_key=${APIKEY}`).then(response => {
    return response.json();
  })
}
