/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Container } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import ValidationTextFields from '.';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container maxWidth={false}>
        <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
        >
          <Grid 
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ListIcon />}
                  >
                    List All Employees
                  </Button>
                </CardActions>
                <Typography className={classes.title} color="textSecondary" gutterBottom pt={4}>
                  Add New Employee
                </Typography>
                <ValidationTextFields />
              </CardContent>
            </Card>
          </Grid>

        </Grid>
    </Container>
  );
}
