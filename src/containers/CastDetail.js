import { useMemo } from 'react';
import { withRouter } from 'react-router';
import * as R from 'ramda';
import {
  withResourcesGetters, useResources, resourceTypes, gettersOf,
} from 'with-resources';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import CastDetail from '../components/CastDetail';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    width: '100vw',
    height: '100vh',
    zIndex: 999,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CastDetailContainer = ({ classes, history, match: { params: { personId } = {} } }) => {
  const { data } = useResources([
    {
      resourceType: resourceTypes.PEOPLE,
      method: 'retrieveOne',
      input: useMemo(
        () => ({
          params: {
            ids: [
              { name: 'personId', value: personId },
            ],
          },
        }),
        [personId],
      ),
      options: { autorun: true },
    },
  ]);
  const { person } = gettersOf(resourceTypes.PEOPLE).getPerson()(data);
  const cast = R.pipe(
    R.juxt([
      R.pipe(
        R.pathOr([], ['movies']),
        R.map(({ id, ...rest }) => ({ ...rest, id, view: () => history.push(`/movie/${id}`) })),
      ),
      R.identity,
    ]),
    R.apply(R.assocPath(['movies'])),
  )(person);

  return R.prop('loading', gettersOf(resourceTypes.PEOPLE).getStatus()('retrieveOne')(data)) ? (
    <Paper className={classes.overlay}>
      <CircularProgress className={classes.loading} />
    </Paper>
  ) : (
    <CastDetail cast={cast} view={() => history.goBack()} />
  );
};

export default R.compose(
  withRouter,
  withResourcesGetters,
  withStyles(styles),
)(CastDetailContainer);
