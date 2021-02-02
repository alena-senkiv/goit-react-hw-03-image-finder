const API_KEY = '19232592-72d20f794acedbda632f0e7bd';
const BASE_URL = 'https://pixabay.com/api';

export function fetchImg(query, page) {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Oops! Nothing found'));
  });
}

const api = {
  fetchImg,
};

export default api;
