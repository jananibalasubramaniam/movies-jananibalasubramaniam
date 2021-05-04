import * as R from 'ramda';
import { resourceTypes } from 'with-resources';

/*
**************************************************
  State Getters
**************************************************
*/
const RESOURCE_TYPE = resourceTypes.MOVIES;

const getMovies = ({ root, defaultValue = { list: [], totalPages: 0 } } = {}) => R.pipe(
  R.pathOr(defaultValue, R.concat(root ? ['resources'] : [], [RESOURCE_TYPE, 'retrieveMany'])),
  R.when(
    R.pipe(R.keys, R.length, R.lte(R.__, 1)),
    R.always(defaultValue),
  ),
  R.pick(['list', 'totalPages']),
);

const getMovie = ({ root, defaultValue = {} } = {}) => R.pipe(
  R.pathOr(defaultValue, R.concat(root ? ['resources'] : [], [RESOURCE_TYPE, 'retrieveOne'])),
  R.when(
    R.pipe(R.keys, R.length, R.lte(R.__, 1)),
    R.always(defaultValue),
  ),
);

export default {
  getMovies,
  getMovie,
};
