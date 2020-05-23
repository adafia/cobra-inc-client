import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Components
import Navbar from './components/Navbar'

// Pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238', //#263238
      light: '#607d8b',
      dark: '#263238',
      contrastText: '#fff'
    },
    secondary: {
      main: '#eceff1',
      light: '#fafafa',
      dark: '#e0e0e0',
      contrastText: '#212121'
    },
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <div className="App">
          <Router>
          <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path='/' component={home}/>
                <Route exact path='/signup' component={signup}/>
                <Route exact path='/login' component={login}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
