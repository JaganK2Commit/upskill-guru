import React from "react";
import { useState } from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import MaterialTable from 'material-table';
import { data } from '../FavSearchData';
import { forwardRef } from "react";
import Fab from "@material-ui/core/Fab";
import Edit from '@material-ui/icons/Edit';

const SavedSearch = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = [
    { title: 'Search name', field: 'searchName' },
    { title: 'Location', field: 'location' },
    //{ title: 'Modify', field: 'modify' },
    //{ title: 'Delete', field: 'delete' }
  ];

  return (
    <div style={{ maxWidth: '90%' }}>
      <MaterialTable
        columns={columns}
        data={data}
        title='Favorite search by job title'
        options={{
          search: false,
          showFirstLastPageButtons: false,
          paging: false
        }}
        icons={{
          //Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />)
        Edit: forwardRef((props, ref) => (
         <Fab ref={ref} {...props} color="primary" aria-label="edit">
             <Edit /> 
            </Fab>
           
         ))
        }}
        />
        
    </div>
  );
};


export default SavedSearch;


