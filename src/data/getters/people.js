import * as R from 'ramda';
import { resourceTypes } from 'with-resources';

/*
**************************************************
  State Getters
**************************************************
*/
const RESOURCE_TYPE = resourceTypes.PEOPLE;

const getPerson = ({ root, defaultValue = {} } = {}) => R.pipe(
  R.pathOr(defaultValue, R.concat(root ? ['resources'] : [], [RESOURCE_TYPE, 'retrieveOne'])),
  R.when(
    R.pipe(R.keys, R.length, R.lte(R.__, 1)),
    R.always(defaultValue),
  ),
);

export default {
  getPerson,
};
