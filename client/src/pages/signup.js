import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo.png';

// Redux
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userAction'

// MUI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
	...theme.formStyles
})

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({ errors: nextProps.UI.errors })
    } 
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history)
  };

  handleChange = event => {
    this.setState({
      errors: {}
    })
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <Grid 
        container 
        className={classes.form}
        alignItems="center"
        justify="center"
        style={{ minHeight: '80vh' }}
      >
        <Card style={{ padding: 30, width: '60%' }}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='cobra Inc logo' className={classes.image} />
          <Typography variant='h3' className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false }
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false }
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              label='Confirm Password'
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false }
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='handle'
              name='handle'
              type='text'
              label='User Handle'
							className={classes.textField}
							helperText={errors.handle}
							error={errors.handle ? true : false }
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
            <Button
              type='submit'
              variant='contained'
              color='primary'
							className={classes.button}
							disabled={loading}
            >
              Sign Up
							{loading && (
								<CircularProgress size={30} className={classes.progress}/>
							)}
            </Button>
						<br />
						<small>Already have an account? Login <Link to="/login">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
        </Card>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
