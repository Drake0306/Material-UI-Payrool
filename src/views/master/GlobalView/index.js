/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import VerticalTabs from './Tabs';
import Breadcrumbs from './BreadCrum';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  multi: {
    padding: '0px'
  },
  '.MuiBox-root-22': {
    padding: '0px'
  }
}));

const GlobalMaster = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth={false}>
        <Breadcrumbs />
        <Box
          mt={3}
        >
          <VerticalTabs />
        </Box>
      </Container>
    </Page>
  );
};

export default GlobalMaster;
