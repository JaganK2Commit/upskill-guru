import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { forwardRef } from "react";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import FavoriteService from "../../services/FavoriteService"

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


export default function Editable() {
  const { useState } = React;
  const columns = [
    { title: 'Favorite Name', field: 'name' },
    { title: 'Job Title', field: 'jobTitle' },
    { title: 'Location', field: 'location' }
  ];

  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  const getFavorites = () => {
    FavoriteService.getAll()
      .then(response => {
        setFavorites(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const createFavorite = (newFavorite) => {
    FavoriteService.create(newFavorite)
      .then(response => {
        console.log(response.data);
        setMessage("The favorite was updated successfully!");
        const dataUpdate = [...favorites];
            dataUpdate.push( response.data.message);
            setFavorites([...dataUpdate]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateFavorite = (updatedFavorite) => {
    FavoriteService.update(updatedFavorite._id, updatedFavorite)
      .then(response => {
        console.log(response.data);
        setMessage("The favorite was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteFavorite = (favoriteId) => {
    console.log('args',favoriteId);
    FavoriteService.remove(favoriteId)
      .then(response => {
        console.log(response.data);
        setMessage("The favorite was deleted successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div style={{ maxWidth: '95%' }}>
    <MaterialTable
    title='Favorite search by job title'
       localization={{
        header: {
            actions: 'Edit Delete'
        }
    }}
      columns={columns}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,

        showFirstLastPageButtons: false,
        paging: false

      }}
      data={favorites}
      editable={{
        onRowAdd: (newData) =>
        new Promise((resolve, reject) => {
          createFavorite (newData);
          resolve();
        }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateFavorite (newData);
            setTimeout(() => {
              const dataUpdate = [...favorites];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setFavorites([...dataUpdate]);
              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteFavorite(oldData._id)
            setTimeout(() => {
              const dataDelete = [...favorites];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setFavorites([...dataDelete]);
              
             resolve();
            }, 1000)
          }),
      }}
    />
    </div>
  )
}



