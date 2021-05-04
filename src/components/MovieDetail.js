import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import classNames from 'classnames';
import CastCard from './CastCard';

const styles = {
  rootContainter: {
    marginTop: 20,
  },
  card: {
    maxWidth: '70%',
    margin: '0 auto',
  },
  topBilledCastsCard: {
    padding: 5,
  },
  media: {
    maxWidth: 300,
    objectFit: 'cover',
  },
};

export default withStyles(styles)(({
  classes,
  browse,
  movie: {
    title,
    overview,
    poster,
    released,
    runtime,
    credits: {
      casts = [],
    } = {},
  } = {},
}) => (
  <Grid container spacing={6} className={classes.rootContainter}>
    <Grid item xs={12}>
      <Card elevation={0} className={classes.card}>
        <Button variant="contained" color="primary" onClick={browse}>
          Back To Movie List
        </Button>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item>
            <CardMedia
              component="img"
              alt={title}
              className={classes.media}
              image={poster}
              title={title}
            />
          </Grid>
          <Grid item xs>
            <CardContent>
              <Typography variant="h3">{title}</Typography>
              <Typography variant="overline" gutterBottom>
                {moment(released).isValid() ? moment(released).format('MMMM DD, YYYY') : 'Unknown release date'}
              </Typography>
              <Typography variant="h6">Runtime</Typography>
              <Typography gutterBottom>{Math.floor(runtime / 60)}h {runtime % 60}m</Typography>
              <Typography variant="h6">Overview</Typography>
              <Typography gutterBottom>{overview}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card elevation={0} className={classNames(classes.card, classes.topBilledCastsCard)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">Top Billed Cast</Typography>
          </Grid>
          <Grid item xs={12} container spacing={5}>
            {casts.map((cast) => (
              <Grid key={cast.id} item>
                <CastCard cast={cast} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
));
