import { useState, useMemo } from 'react';
import { withRouter } from 'react-router';
import * as R from 'ramda';
import {
  withResourcesGetters, useResources, resourceTypes, gettersOf,
} from 'with-resources';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import BrowseList from '../components/BrowseList';

const PAGE_SIZE = 20;

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

const BrowseListContainer = ({ classes, history }) => {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const { data } = useResources([
    {
      resourceType: resourceTypes.MOVIES,
      method: 'retrieveMany',
      input: useMemo(
        () => ({
          params: {
            queries: [
              { name: 'page', value: page + 1 },
              { name: 'query', value: keyword },
            ],
          },
        }),
        [page, keyword],
      ),
      options: { autorun: true },
    },
  ]);
  const { list, totalPages } = gettersOf(resourceTypes.MOVIES).getMovies()(data);
  const movies = list.map(({ id, ...rest }) => ({ ...rest, id, view: () => history.push(`/movie/${id}`) }));

  return (
    <>
      <BrowseList
        movies={movies}
        pagination={{
          page,
          pageSize: PAGE_SIZE,
          totalPages,
          changePage: setPage,
        }}
        searching={{ keyword, search: (term) => { setPage(0); setKeyword(term); } }}
      />
      {R.prop('loading', gettersOf(resourceTypes.MOVIES).getStatus()('retrieveMany')(data)) && (
        <Paper className={classes.overlay}>
          <CircularProgress className={classes.loading} />
        </Paper>
      )}
    </>
  );
};

export default R.compose(
  withRouter,
  withResourcesGetters,
  withStyles(styles),
)(BrowseListContainer);
