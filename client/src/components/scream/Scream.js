import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'
import MyButton from '../../utils/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

//Redux
import { connect } from 'react-redux';

// Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Icons
import ChatIcon from '@material-ui/icons/Chat'


const styles = {
  card: {
    position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200,
    objectFit: 'cover',
    ['@media only screen and (max-width: 600px)']: {
      minWidth: '35%',
      objectFit: 'cover'
    }
	},
	content: {
		padding: 25,
		objectFit: 'cover'
  },
  reactionTxt: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: 12
    }
  },
  reactionIcon: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: 13
    }
  }
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
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
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}/>
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} id="phone" title='Profile image' className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography
            varient='h5'
            component={Link}
						to={`/users/${userHandle}`}
						color='primary'
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton screamId={screamId}/>
          <span className={classes.reactionTxt}>{likeCount} likes</span>
          <MyButton tip="Comments">
            <ChatIcon className={classes.reactionIcon} color="primary"/>
          </MyButton>
          <span className={classes.reactionTxt}>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream));
