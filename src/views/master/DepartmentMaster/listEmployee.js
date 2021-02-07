/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DataTable from './TableList';
import Toolbar from './Toolbar';
import BreadCrumList from './BreadCrumList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ListEmployee = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Customers"
    >   
      <Container maxWidth={false}>
        <BreadCrumList />
        <Toolbar />
        <Box mt={3}>
          <DataTable />
        </Box>
      </Container>
    </Page>
  );
};

export default ListEmployee;
