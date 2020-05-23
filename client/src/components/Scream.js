import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';


// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200,
		objectFit: 'cover'
	},
	content: {
		padding: 25,
		objectFit: 'cover'
	}
};

class Scream extends Component {
  render() {
    const {
      classes,
      scream: {
        userImage,
        body,
        createdAt,
        userHandle,
        screamId,
        likeCount,
        commentCount
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title='Profile image' className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography
            varient='h5'
            component={Link}
						to={`/users/${userHandle}`}
						color='primary'
          >
            {userHandle}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {createdAt}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
