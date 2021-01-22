/* eslint-disable linebreak-style */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useNavigate } from 'react-router-dom';

export default function ActiveLastBreadcrumb() {
  const navigate = useNavigate();

  function handleClick1(event) {
    event.preventDefault();
    // console.info('You clicked a breadcrumb.');
    navigate('/app/dashboard', { replace: true });
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/app/dashboard" onClick={handleClick1}>
        Dashboard
      </Link>
      <Link
        color="textPrimary"
        href="/app/dashboard"
        onClick={handleClick1}
        aria-current="page"
      >
        <b>Overview</b>
      </Link>
    </Breadcrumbs>
  );
}
