/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px'
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  muibox: {
    padding: '0px'
  },
  '.MuiBox-root-22': {
    padding: '0px'
  }
}));

const EditToolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    navigate('/app/master/list/site', { replace: true });
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        className={classes.muibox}
        display="flex"
        justifyContent="flex-start"
      >
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div" style={{ fontSize: '25px' }}>
          Edit Site
        </Typography>

        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        
      </Box>
      <Box
        className={classes.muibox}
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <Button
          color="light"
          variant="outlined"
          onClick={handleClick}
        >
          Back
        </Button>
      </Box>
      {/* <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </div>
  );
};

EditToolbar.propTypes = {
  className: PropTypes.string
};

export default EditToolbar;
