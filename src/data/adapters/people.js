import * as R from 'ramda';
import { BACKDROP_BASE_URL, POSTER_BASE_URL, PHOTO_BASE_URL } from '../../api/rest';
import MovieBackdrop from '../assets/imgs/movie_backdrop.jpg';
import MoviePoster from '../assets/imgs/movie_poster.jpg';
import Anonymous from '../assets/imgs/anonymous.jpg';

const retrieveOne = {
  fe2be: R.identity,
  be2fe: ({
    birthday: dob,
    gender,
    biography: bio,
    profile_path,
    movie_credits: {
      cast = [],
    } = {},
    ...rest
  }) => ({
    person: {
      ...rest,
      dob,
      gender: gender === 1 ? 'Female' : 'Male',
      bio,
      photo: profile_path ? `${PHOTO_BASE_URL}${profile_path}` : Anonymous,
      movies: cast.map(({
        backdrop_path,
        poster_path,
        release_date: released,
        ...others
      }) => ({
        ...others,
        backdrop: backdrop_path ? `${BACKDROP_BASE_URL}${backdrop_path}` : MovieBackdrop,
        poster: poster_path ? `${POSTER_BASE_URL}${poster_path}` : MoviePoster,
        released,
      })),
    },
  }),
};

export default {
  retrieveOne,
};
