import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo.png';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction'

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

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
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
        <Card style={{ padding: 30 }}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='cobra Inc logo' className={classes.image} />
          <Typography variant='h3' className={classes.pageTitle}>
            Login
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
              Login
							{loading && (
								<CircularProgress size={30} className={classes.progress}/>
							)}
            </Button>
						<br />
						<small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
        </Card>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
