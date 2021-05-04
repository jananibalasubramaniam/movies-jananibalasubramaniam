import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import classNames from 'classnames';
import MovieCard from './MovieCard';

const styles = {
  rootContainter: {
    marginTop: 20,
  },
  card: {
    maxWidth: '70%',
    margin: '0 auto',
  },
  knownForCard: {
    padding: 5,
  },
  media: {
    maxWidth: 300,
    objectFit: 'cover',
  },
};

export default withStyles(styles)(({
  classes,
  view,
  cast: {
    name,
    bio,
    gender,
    dob,
    photo,
    movies = [],
  } = {},
}) => (
  <Grid container spacing={6} className={classes.rootContainter}>
    <Grid item xs={12}>
      <Card elevation={0} className={classes.card}>
        <Button variant="contained" color="primary" onClick={view}>
          Back To Movie
        </Button>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              alt={name}
              className={classes.media}
              image={photo}
              title={name}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <Typography variant="h3">{name}</Typography>
              <Typography variant="overline" gutterBottom>{gender} on {moment(dob).format('DD-MM-YYYY')}</Typography>
              <Typography variant="h6">Biography</Typography>
              <Typography gutterBottom>{bio}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card elevation={0} className={classNames(classes.card, classes.knownForCard)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Known For</Typography>
          </Grid>
          <Grid item xs={12} container spacing={5}>
            {movies.map((movie) => (
              <Grid key={movie.id} item>
                <MovieCard small movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
));
