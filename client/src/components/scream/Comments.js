import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  ...theme.formStyles,
  commentImage: {
    maxWidth: '100%',
    height: 50,
    objectFit: 'cover',
    borderRadius: '25%',
    ['@media only screen and (max-width: 600px)']: {
      height: 40,
      borderRadius: '25%'
    }
  },
  commentData: {
    marginLeft: 5,
    ['@media only screen and (max-width: 600px)']: {
      marginLeft: 10
    }
  },
  comment: {
    marginLeft: 20,
    ['@media only screen and (max-width: 600px)']: {
      marginLeft: 10
    }
  },
  visibleSeparator: {
    width: '100%',
    margin: 20
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
  body: {
    marginLeft: 115,
    ['@media only screen and (max-width: 600px)']: {
      fontSize: '14px',
      marginLeft: 60,
    }
  }
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid className={classes.comment} item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt='comment'
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant='h5'
                        component={Link}
                        className={classes.handle}
                        to={`/users/${userHandle}`}
                        color='primary'
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant='body2' className={classes.date} color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={12}>
                  <Typography className={classes.body} variant='body1'>{body}</Typography>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
