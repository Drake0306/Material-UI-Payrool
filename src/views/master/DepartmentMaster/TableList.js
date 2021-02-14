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
import React, {useReducer, useEffect} from 'react';
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

  const loadNewPage = (id) => {
    navigate('/app/master/edit/department/' + id, { replace: true });
  };

  useEffect(() => {
    const URL = localStorage.getItem('url');
      axios.get(URL + 'api/departmentList')
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

  return (
    <MaterialTable
      style={{fontFamily: 'Roboto, Helvetica, Arial, sans-serif', padding: '10px', fontSize: '14px', maxHeight: '500px', overflowX: 'auto'}}
      title="Department List"
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
      ]}
      data={values.loadData}     
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
          tooltip: 'Edit Department',
          onClick: (event, rowData) => {
            loadNewPage(rowData.id);
          }
        },
        // {
        //   icon: 'keyboard_arrow_right',
        //   position: 'row',
        //   tooltip: 'View Department',
        //   onClick: (event, rowData) => {
        //     alert('You saved ' + rowData.id);
        //   }
        // },
      ]}
    />
  );
}
