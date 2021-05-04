import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 150,
  },
  media: {
    objectFit: 'cover',
  },
};

export default withStyles(styles)(({
  classes,
  cast: {
    name,
    photo,
    character,
    view,
  } = {},
}) => (
  <Card className={classes.card}>
    <CardActionArea onClick={view}>
      <CardMedia
        component="img"
        alt={name}
        className={classes.media}
        image={photo}
        title={name}
      />
      <CardContent>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption">{character}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
));
