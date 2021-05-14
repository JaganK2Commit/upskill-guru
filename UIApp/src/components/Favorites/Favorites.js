import React, { useState,useContext, useEffect } from "react";
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
import FavoriteService from "../../services/FavoriteService";
import Autocomplete from '../Autocomplete/Autocomplete.js';
import LocationService from "../../services/LocationService";
import AutocompleteJobTitle from '../SearchResult/AutocompleteJobTitle'
import SearchService from "../../services/SearchService";
import JobService from "../../services/JobService";
import { UserContext } from '../../UserContext';

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
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [location, setLocation] = useState('');
  const [searchTitle, setSearchTitle] = useState("");
  const [jobSuggestions, setJobSuggestions] = React.useState([]);
  const [skill, setSkill] = useState('');
  const { user } = useContext(UserContext);
  const handleSelectedLocation = (value) => {
    setLocation(value);
  }

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  }
  const handleSelectedSkill = (value) => {
    setSkill(value);
  }

  const getJobSuggestions = async (value) => {
    const response = await JobService.findSuggestions(value, 10);
    const jobValues = response.data.message;
    console.log(jobValues);
    setJobSuggestions(jobValues);
  }
  
  const searchHandle = async () => {
    const response = await SearchService.get(searchTitle);
  };

  const columns = [
    { title: 'Favorite Name', field: 'name' },
    { title: 'Job Title', 
      field: 'jobTitle',
      render: (l) => l.jobTitle.label,
      editComponent: (prop) => <Autocomplete 
      defaultValue = {prop.rowData.jobTitle}
      options={ jobSuggestions.map(
        (job) => ({label:job.JobTitle, value:job.JobId}))}
              limitTags={1}
              handleChange={getJobSuggestions}
              handleSelection={(s) => {
                prop.onChange(s);}}/>,
    },

    {
      title: "Location",
      field: "location",
      render: (l) => l.location.label,
      editComponent: (prop) => (
        <Autocomplete
          defaultValue = {prop.rowData.location}
          //placeholder="New York, NY"
          options={locationSuggestions.map(
            (loc) => ({ label : `${loc.city}, ${loc.state}`, value : loc.locationId})
          )}
          limitTags={1}
          handleChange={getLocationSuggestions}
          handleSelection={(s) => {
            prop.onChange(s);
          }}
          
        />
      ),
    }

  ];

  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  const getFavorites = () => {
    FavoriteService.getAll(user.uid)
      .then((response) => {
        setFavorites(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const createFavorite = (newFavorite) => {

    FavoriteService.create({userId:user.uid,...newFavorite})
      .then(response => {
        console.log(response.data);
        setMessage("The favorite was updated successfully!");
        const dataUpdate = [...favorites];
            dataUpdate.push( response.data.message);
            setFavorites([...dataUpdate]);
      })
      .catch(e => {
        console.log(e);
        console.log(favorites);
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
    if(user)
      getFavorites();
      getLocationSuggestions("");
      getJobSuggestions("J");
  }, [user]);

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
          console.log('MaterialTable Update handler is called', newData);
          newData.LocationId = newData.location.value;
          newData.City = newData.location.label.split(',')[0];
          newData.State = newData.location.label.split(',')[1];
         // newData.skillName = newData.skill.value;
          updateFavorite(newData);
          setTimeout(() => {
            const dataUpdate = [...favorites];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setFavorites([...dataUpdate]);
            resolve();
          }, 1000);
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



