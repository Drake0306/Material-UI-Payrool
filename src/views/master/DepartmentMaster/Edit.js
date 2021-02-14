/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable linebreak-style */
import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from '../../account/AccountView/Profile';
import FormEdit from './EditForm';
import SideOptions from './sideOptions';
import DataTable from './TableList';
import EditTollbar from './EditTollbar';
import EditBreadCrumList from './EditBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    padding: '0px'
  },
  muibox: {
    padding: '0px'
  },
  '.MuiBox-root-22': {
    padding: '0px'
  },
  gridSpace: {
    padding: theme.spacing(0)
  }
}));

const Edit = () => {
  const classes = useStyles();

  return (
    <Page
    className={classes.root}
    title="Customers"
    >
        <Container maxWidth={false}>
            <EditBreadCrumList />
            <EditTollbar />
            <Box mt={3}>
                <Grid
                container
                item
                direction="column"
                lg={12}
                md={12}
                xs={12}
                >
                    <FormEdit />
                </Grid>
            </Box>
        </Container>
    </Page>
  );
};

export default Edit;
