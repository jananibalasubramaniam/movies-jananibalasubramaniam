import * as R from 'ramda';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '31678fb9d28d7cb3989d049c0061a995';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
const PHOTO_BASE_URL = 'https://image.tmdb.org/t/p/w276_and_h350_face';

const process = R.ifElse(
  R.prop('ok'),
  (response) => response.json(),
  (response) => ({ error: { code: response.status, message: response.statusText } }),
);
const appendApiKey = R.pipe(
  R.split('?'),
  R.insert(1, `api_key=${API_KEY}`),
  (arr) => `${arr[0]}?${arr.slice(1).join('&')}`,
);

const httpGet = R.curry((url) => fetch(appendApiKey(`${API_URL}/${url}`), {
  method: 'GET',
}).then(process));

const httpPost = R.curry((url, body) => fetch(appendApiKey(`${API_URL}/${url}`), {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then(process));

const httpPut = R.curry((url, body) => fetch(appendApiKey(`${API_URL}/${url}`), {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then(process));

const httpDelete = R.curry((url) => fetch(appendApiKey(`${API_URL}/${url}`), {
  method: 'DELETE',
}).then(process));

export {
  BACKDROP_BASE_URL, POSTER_BASE_URL, PHOTO_BASE_URL, httpGet, httpPost, httpPut, httpDelete,
};
