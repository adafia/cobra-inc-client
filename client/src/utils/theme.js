export default {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#03071E',
      dark: '#03071E',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#D00000',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  formStyles: {
    form: {
      textAlign: 'center',
      verticalAlign: 'middle'
    },
    image: {
      margin: '20px auto 20px, auto',
      width: '150px'
    },
    pageTitle: {
      margin: '20px auto 20px, auto'
    },
    textField: {
      margin: '10px auto 10px, auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '5%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      display: 'block',
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
};
