/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-restricted-globals */
/* eslint-disable arrow-parens */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-template */
import 'date-fns';
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  colors
} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { Form, replace } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForceUpdate from 'use-force-update';
import Typography from '@material-ui/core/Typography';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import Swal from 'sweetalert2';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const FormEntry = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',

  });

  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false);

  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [checkState, setCheckState] = React.useState({
    fillPaddress: false,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const navigate = useNavigate();
  // const ListData = () => {
  //   navigate('/app/master/list/employee', { replace: true });
  // };

  const CheckValue = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked
    });
  };

  const SendData = event => {
    event.preventDefault();
    // switch icon
    setClicked(true);

    let URL = localStorage.getItem('url');
    axios.post(URL + 'api/designation-add', values)
      .then(respomse => {
        console.log(respomse);
        if (respomse.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          values.name = '';
        }
        if (respomse.data === 'exist') {
          Swal.fire({
            icon: 'info',
            title: 'Already exist',
            text: 'Enter new one',
            timer: 2000,
            // footer: '<a href>Why do I have this issue?</a>'
          });
        }

        // switch icon
        setClicked(false);
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Internal server error',
          text: 'Something went wrong!',
          timer: 3000,
          // footer: '<a href>Why do I have this issue?</a>'
        });

        // switch icon
        setClicked(false);
      });
  };

  return (
    <form
      autoComplete="false"
      Validate
      onSubmit={SendData}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Make sure to fill all fields marked with *"
          title="Create Designation"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Information</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify name"
                label="Designation  name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="danger"
            type="submit"
            variant=""
            startIcon={
              clicked === true
              ? <CircularProgress style={{color: 'green'}} size={20} />
              : <SaveIcon style={{color: 'green'}} />
            }
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

FormEntry.propTypes = {
  className: PropTypes.string
};

export default FormEntry;

