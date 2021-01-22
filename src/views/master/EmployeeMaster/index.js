/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ComposedTextField from './Entry';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EmployeeMaster = () => {
  const classes = useStyles();

  return (
    <ComposedTextField />
  );
};

export default EmployeeMaster;
