/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable padded-blocks */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable arrow-parens */
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import MaterialTable from 'material-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BasicExport() {
  const { useState } = React;
  const [selectedRow, setSelectedRow] = useState(null);
  const [values, setValues] = useState({
    loadData: [],
  });
  const navigate = useNavigate();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const URL = localStorage.getItem('url');
      axios.get(URL + 'api/siteList')
      .then(respomse => {
        console.log(respomse);
        values.loadData = respomse.data;
        forceUpdate();
      })
      .catch(error => {
        console.log(error);
        alert('Internal Server error');
      });
  }, []);

  const loadNewPage = (id) => {
    navigate('/app/master/edit/site/' + id, { replace: true });
  };

    return (
      <MaterialTable
        style={{fontFamily: 'Roboto, Helvetica, Arial, sans-serif', padding: '10px', fontSize: '14px', maxHeight: '500px', overflowX: 'auto'}}
        title="Site List"
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Name', field: 'name' },
        ]}
        data={values.loadData}
        // data={[
        //   { id: 'Mehmet', name: 'Baran'},
        // ]}     
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}   
        options={{
          exportButton: true,
          filtering: false,
          grouping: true,
          // selection: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Site',
            onClick: (event, rowData) => {
              loadNewPage(rowData.id);
            }
          },
          // {
          //   icon: 'keyboard_arrow_right',
          //   position: 'row',
          //   tooltip: 'View Site',
          //   onClick: (event, rowData) => {
          //     alert('You saved ' + rowData.id);
          //   }
          // },
        ]}
      />
    );
  }
