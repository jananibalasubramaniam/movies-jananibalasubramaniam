import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = {
  backdropCard: {
    maxWidth: 450,
  },
  posterCard: {
    width: 200,
  },
  media: {
    objectFit: 'cover',
  },
};

export default withStyles(styles)(
  ({
    classes, small = false, movie: {
      title, backdrop, poster, released, view,
    } = {},
  }) => (small ? (
    <Card className={classes.posterCard}>
      <CardActionArea onClick={view}>
        <CardMedia
          component="img"
          alt={title}
          className={classes.media}
          image={poster}
          title={title}
        />
        <CardContent>
          <Typography variant="subtitle2">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card className={classes.backdropCard}>
      <CardActionArea onClick={view}>
        <CardMedia
          component="img"
          alt={title}
          className={classes.media}
          image={backdrop}
          title={title}
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography>
            {moment(released).isValid()
              ? moment(released).format('MMMM DD, YYYY')
              : 'Unknown release date'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )),
);
