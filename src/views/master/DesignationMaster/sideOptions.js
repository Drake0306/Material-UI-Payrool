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
/* eslint-disable react/jsx-one-expression-per-line */
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
  colors,
  Typography
} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Form, replace } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForceUpdate from 'use-force-update';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
      padding: theme.spacing(2)
    }
  }));


const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];


const SideOptions = ({ className, ...rest }) => {
  const [importExel, importData] = useState(false);
  const [exportExel, exportData] = useState(false);


  const clickImport = event => {
    // switch icon
    importData(true);

    setTimeout(
      () => {
          importData(false);
        },
      3000
    );
  };

  const clickExport = event => {
    // switch icon
    exportData(true);

    setTimeout(
      () => {
          exportData(false);
        },
      3000
    );
  };

  const navigate = useNavigate();
  const ListData = () => {
    navigate('/app/master/list/designation', { replace: true });
  };


  return (
      <Card style={{padding: '10px', marginTop: '30px'}}>
        <CardHeader
          title="Other actions"
        //   subheader="Make sure to fill all required fields"
        />
        <Divider />
        <CardContent>
            <Grid
            style={{marginTop: '10px'}}
            container
            spacing={0}
            >
                <Typography variant="body2">
                    Import your data in this master !!
                </Typography>
            </Grid>

            <Grid
            style={{marginTop: '10px'}}
            container
            spacing={0}
            >
                <Button
                color="danger"
                type="button"
                onClick={clickImport}
                startIcon={
                importExel === true
                ? <CircularProgress color="inherit" size={20} />
                : <PublishIcon />
                }
                >
                    IMPORT DATA
                </Button>
            </Grid>

            <Grid
            style={{marginTop: '10px'}}
            container
            spacing={0}
            >
                <Typography variant="body2">
                    Export all data available in this master !!
                </Typography>
            </Grid>

            <Grid
            style={{marginTop: '10px'}}
            container
            spacing={0}
            >
                <Button
                color="danger"
                type="button"
                onClick={clickExport}
                startIcon={
                exportExel === true
                ? <CircularProgress color="inherit" size={20} />
                : <GetAppIcon />
                }
                >
                    EXPORT DATA
                </Button>
            </Grid>
            <Grid
            style={{marginTop: '40px'}}
            container
            spacing={0}
            >
                <Typography variant="body2">
                    List for all existing data of this master. <br />
                    Other actions like edit can be found here <br />
                    <br />
                    <span style={{color: '#DE644A', fontSize: '20px'}}>!!</span> <b style={{paddingRight: '10px', color: '#DE644A'}}>Loading time depends on (data size)</b>
                </Typography>
            </Grid>

            <Grid
            style={{marginTop: '10px'}}
            container
            spacing={0}
            >
                <Button
                    color="secondary"
                    startIcon={<ListAltIcon />}
                    onClick={ListData}
                    variant="contained"
                >
                    List All Designation
                </Button>
            </Grid>
        </CardContent>
      </Card>
  );
};

SideOptions.propTypes = {
  className: PropTypes.string
};

export default SideOptions;

