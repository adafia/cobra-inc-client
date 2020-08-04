import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

//Icon
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


const styles = {
  reactionIcon: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: 13 
    }
  }
};

class LikeButton extends Component {
	likedScream = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
      return true
    } else {
      return false
    }
	};
	
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
	};
	
  render() {
		const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
				<MyButton tip='Like'>
          <FavoriteBorder className={this.props.classes.reactionIcon} color='secondary' />
      	</MyButton>
			</Link>
    ) : this.likedScream() ? (
      <MyButton tip='Undo Like' onClick={this.unlikeScream}>
        <Favorite className={this.props.classes.reactionIcon} color='secondary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeScream}>
        <FavoriteBorder className={this.props.classes.reactionIcon} color='secondary' />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));
