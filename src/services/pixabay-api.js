const API_KEY = '19232592-72d20f794acedbda632f0e7bd';
const BASE_URL = 'https://pixabay.com/api';

export const fetchImg = (query, page, perPage) => {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${API_KEY}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Oops! Nothing found'));
  });
};
