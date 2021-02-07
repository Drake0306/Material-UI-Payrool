/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight
} from 'react-feather';

export default function ActiveLastBreadcrumb() {
  const navigate = useNavigate();

  function handleClick1(event) {
    event.preventDefault();
    // console.info('You clicked a breadcrumb.');
    navigate('/app/dashboard', { replace: true });
  }

  function handleClick2(event) {
    event.preventDefault();
    navigate('/app/master', { replace: true });
  }
  
  function handleClick3(event) {
    event.preventDefault();
    navigate('/app/master/list/employee', { replace: true });
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/app/dashboard" onClick={handleClick1}>
        Dashboard
      </Link>
      <Link
        color="textPrimary"
        href="/app/master"
        onClick={handleClick2}
        aria-current="page"
      >
        Master
      </Link>
      <Link
        color="textPrimary"
        href="/app/master"
        onClick={handleClick3}
        aria-current="page"
      >
        <b>Employee List</b>
      </Link>
      
    </Breadcrumbs>
  );
}
