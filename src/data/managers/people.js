import * as R from 'ramda';
import { httpGet } from '../../api/rest';
import adapters from '../adapters';
import { getIdsObject } from '../../utils';

const DM = async ({ method, input }) => ({ [method]: await DM[method](input) });

DM.retrieveOne = async ({ params: { ids } }) => R.pipe(
  getIdsObject,
  ({ personId }) => httpGet(`person/${personId}?append_to_response=movie_credits`),
  (response) => response.then(adapters.people.retrieveOne.be2fe),
)(ids);

export default DM;
