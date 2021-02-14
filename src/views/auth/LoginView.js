/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-template */
/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem('url', 'http://127.0.0.1:8000/');
    localStorage.setItem('url', 'http://dev.swirlitsolutions.com/payrool/');
    console.log(e.target.user_name.value);
    
    const URL = localStorage.getItem('url');
    axios.post(URL + 'api/log-in', values)
      .then(respomse => {
        console.log(respomse);
        if (respomse.data.status === '400') {
          alert('Not found');
        } else {
          localStorage.setItem('id', respomse.data.id);
          localStorage.setItem('time', respomse.data.time);
          localStorage.setItem('username', respomse.data.username);
          if (respomse.data.username === 'admin') {
            localStorage.setItem('user_role', 'Super Admin');
          } else {
            localStorage.setItem('user_role', 'N.A');
          }
          
          // window.location.reload(true);
          navigate('/app/dashboard', { replace: true });
        }
      })
      .catch(error => {
        console.log(error);
        alert('Internal Server error');
      });
  };

  const getData = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };


  const username = localStorage.getItem('username');
  if (username != null) {
    navigate('/app/dashboard', { replace: true });
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user_name"
            label="User ID"
            name="user_name"
            value={values.user_name}
            onChange={getData}
            autoComplete="user_name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={getData}
            value={values.password}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" checked color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
