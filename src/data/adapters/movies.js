import * as R from 'ramda';
import { BACKDROP_BASE_URL, POSTER_BASE_URL, PHOTO_BASE_URL } from '../../api/rest';
import MovieBackdrop from '../assets/imgs/movie_backdrop.jpg';
import MoviePoster from '../assets/imgs/movie_poster.jpg';
import Anonymous from '../assets/imgs/anonymous.jpg';

const retrieveMany = {
  fe2be: R.identity,
  be2fe: ({
    total_pages: totalPages,
    results = [],
    ...rest
  }) => ({
    ...rest,
    totalPages,
    list: R.map(({
      backdrop_path,
      poster_path,
      release_date: released,
      ...others
    }) => ({
      ...others,
      backdrop: backdrop_path ? `${BACKDROP_BASE_URL}${backdrop_path}` : MovieBackdrop,
      poster: poster_path ? `${POSTER_BASE_URL}${poster_path}` : MoviePoster,
      released,
    }))(results),
  }),
};

const retrieveOne = {
  fe2be: R.identity,
  be2fe: ({
    backdrop_path,
    poster_path,
    release_date: released,
    credits: {
      cast: casts,
      ...others
    },
    ...rest
  }) => ({
    movie: {
      ...rest,
      backdrop: backdrop_path ? `${BACKDROP_BASE_URL}${backdrop_path}` : MovieBackdrop,
      poster: poster_path ? `${POSTER_BASE_URL}${poster_path}` : MoviePoster,
      released,
      credits: {
        ...others,
        casts: R.map(({
          profile_path,
          ...props
        }) => ({
          ...props,
          photo: profile_path ? `${PHOTO_BASE_URL}${profile_path}` : Anonymous,
        }))(casts),
      },
    },
  }),
};

export default {
  retrieveMany,
  retrieveOne,
};
