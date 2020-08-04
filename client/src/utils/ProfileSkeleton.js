import React from 'react';
import NoImg from '../images/noImage.png';
import PropTypes from 'prop-types';

//MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
    ...theme.formStyles,
    handle:{
        width: 60,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
    }
});

const ProfileSkeleton = props => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={NoImg} alt='profile' className='profile-image' />
        </div>
        <hr />
        <div className='profile-details'>
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary"/> <span>Location</span>
          <hr />
          <LinkIcon color="primary"/> <span>https://website.com</span>
          <hr />
          <CalendarToday color="primary" /> <span>Joined date</span>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
