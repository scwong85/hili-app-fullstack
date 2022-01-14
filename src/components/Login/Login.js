import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Alert, AlertTitle } from "@mui/material";

import * as action from '../../store/actions/auth';
import { connect } from 'react-redux';


const theme = createTheme();

function SignIn(props) {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.onAuth(data.get('username'), data.get('password'))
  };

  

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate('/');
    } 
  }, [props.isAuthenticated])

  useEffect(() => {
    if (props.error) {
      console.log('error', props.error)
    } 
  }, [props.error])

  const loginError = () => {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Invalid username or password
      </Alert>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" maxWidth="xs" sx={{height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?nature)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={6} md={6} style={{padding: '2em'}}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          { props.error ? loginError(): <></> }
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup/" variant="body2">
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
        </Grid>
        
      </Grid>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error,  
    isAuthenticated: state.token !== null,
    user_id: state.user_id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(action.authLogin(username, password)),
    onParseJwt: (token) => action.parseJwt(token),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);