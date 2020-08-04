import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.formStyles,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '5%',
    objectFit: 'cover',
    ['@media only screen and (max-width: 600px)']: {
      height: 100,
      position: 'relative',
      borderRadius: '5%',
      marginRight: 20
    }
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    ['@media only screen and (max-width: 600px)']: {
      left: '85%'
    }
  },
  handle: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: '15px'
    }
  },
  date: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: '12px'
    }
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
    ['@media only screen and (max-width: 600px)']: {
      fontSize: '11px',
      left: '87%',
      bottom: '0.5%'
    }
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginButtom: 50
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginButtom: 20
  },
  reactionIcon: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: 13 
    }
  },
  reactionTxt: {
    ['@media only screen and (max-width: 600px)']: {
      fontSize: 12
    }
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };

  componentDidMount(){
    if(this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname
    const { userHandle, screamId } = this.props
    const newPath = `/users/${userHandle}/scream/${screamId}`

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;    
    window.history.pushState(null, null, newPath)

    this.setState({ open: true, oldPath, newPath});
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            className={classes.handle}
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography className={classes.date} variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>{body}</Typography>
          <LikeButton screamId={screamId} />
          <span className={classes.reactionTxt}>{likeCount} likes</span>
          <MyButton tip='Comments'>
            <ChatIcon className={classes.reactionIcon} color='primary' />
          </MyButton>
          <span className={classes.reactionTxt}>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='Expand Post'
          btnClassName={classes.expandButton}
        >
          <UnfoldMore color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.array.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
