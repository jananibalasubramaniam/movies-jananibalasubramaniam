import * as R from 'ramda';
import { httpGet } from '../../api/rest';
import adapters from '../adapters';
import { getQueriesObject, getQueriesString, getIdsObject } from '../../utils';

const DM = async ({ method, input }) => ({ [method]: await DM[method](input) });

DM.retrieveMany = async ({ params: { queries } }) => R.pipe(
  R.juxt([
    R.pipe(
      getQueriesObject,
      R.ifElse(R.prop('query'), R.always('search/movie'), R.always('movie/popular')),
    ),
    getQueriesString,
  ]),
  ([url, queriesString]) => httpGet(`${url}${queriesString}`),
  (response) => response.then(adapters.movies.retrieveMany.be2fe),
)(queries);

DM.retrieveOne = async ({ params: { ids } }) => R.pipe(
  getIdsObject,
  ({ movieId }) => httpGet(`movie/${movieId}?append_to_response=credits`),
  (response) => response.then(adapters.movies.retrieveOne.be2fe),
)(ids);

export default DM;
