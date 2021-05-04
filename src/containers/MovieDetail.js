import { useMemo } from 'react';
import { withRouter } from 'react-router';
import * as R from 'ramda';
import {
  withResourcesGetters, useResources, resourceTypes, gettersOf,
} from 'with-resources';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieDetail from '../components/MovieDetail';

const TOP_CASTS = 5;

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

const padToLongestName = (casts) => {
  const longest = (name) => R.reduce(
    (max, item) => Math.max(max, R.pipe(R.prop(name), R.length)(item)),
    0,
  );
  const longestName = longest('name')(casts);
  const longestCharacter = longest('character')(casts);
  return casts.map(({ name, character, ...rest }) => ({ ...rest, name: name.padEnd(longestName, ' '), character: character.padEnd(longestCharacter, ' ') }));
};

const MovieDetailContainer = ({ classes, history, match: { params: { movieId } = {} } }) => {
  const { data } = useResources([
    {
      resourceType: resourceTypes.MOVIES,
      method: 'retrieveOne',
      input: useMemo(
        () => ({
          params: {
            ids: [
              { name: 'movieId', value: movieId },
            ],
          },
        }),
        [movieId],
      ),
      options: { autorun: true },
    },
  ]);
  let { movie } = gettersOf(resourceTypes.MOVIES).getMovie()(data);
  movie = R.pipe(
    R.juxt([
      R.pipe(
        R.pathOr([], ['credits', 'casts']),
        R.take(TOP_CASTS),
        padToLongestName,
        R.map(({ id, ...rest }) => ({ ...rest, id, view: () => history.push(`/cast/${id}`) })),
      ),
      R.identity,
    ]),
    R.apply(R.assocPath(['credits', 'casts'])),
  )(movie);

  return R.prop('loading', gettersOf(resourceTypes.MOVIES).getStatus()('retrieveOne')(data)) ? (
    <Paper className={classes.overlay}>
      <CircularProgress className={classes.loading} />
    </Paper>
  ) : (
    <MovieDetail movie={movie} browse={() => history.push('/')} />
  );
};

export default R.compose(
  withRouter,
  withResourcesGetters,
  withStyles(styles),
)(MovieDetailContainer);
