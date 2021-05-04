import { useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchBar from 'material-ui-search-bar';
import Pagination from 'material-ui-flat-pagination';
import debounce from 'lodash/debounce';
import * as R from 'ramda';
import MovieCard from './MovieCard';

const styles = {
  rootContainter: {
    maxWidth: '1000px',
    margin: '0 auto',
    marginTop: 20,
  },
  centerScreen: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default withStyles(styles)(({
  classes,
  movies = [],
  pagination: {
    page, pageSize, totalPages, changePage,
  },
  searching: {
    keyword,
    search,
  },
}) => {
  const debouncedSearch = useCallback(debounce(search, 500), []);

  return (
    <Grid container justify="center" spacing={1} className={classes.rootContainter}>
      <Grid item xs={12} container justify="space-between">
        <Grid item>
          <Typography variant="h6" component="h2">
            Popular Movies (Test CI/CD)
          </Typography>
        </Grid>
        <Grid item>
          <SearchBar value={keyword} onChange={debouncedSearch} onCancelSearch={() => search('')} />
        </Grid>
      </Grid>
      {R.either(R.isNil, R.isEmpty)(movies) ? (
        <Typography className={classes.centerScreen} variant="h5" component="h2">Sorry, we can't find the movies you are looking for :(</Typography>
      ) : (
        <>
          <Grid item xs={12} container justify="center" spacing={5}>
            {movies.map((movie) => (
              <Grid key={movie.id} item>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Pagination
              limit={pageSize}
              offset={page * pageSize}
              total={totalPages * pageSize}
              onClick={(e, offset) => changePage(offset / pageSize)}
            />
          </Grid>
        </>
      )}
      </Grid>
  );
});
