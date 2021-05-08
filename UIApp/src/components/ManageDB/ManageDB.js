import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { data } from "./DBData";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AutoComplete from "./Autocomplete";
import { skillsData } from "./SkillData";
import JobService from "../../services/JobService";
import Autocomplete from "../Autocomplete/Autocomplete.js";
import LocationService from "../../services/LocationService";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Editable() {
  const { useState } = React;
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [location, setLocation] = useState();

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  };

  const columns = [
    { title: "Job Id", field: "JobId" },
    { title: "Job title", field: "JobTitle" },
    { title: "Employer", field: "EmployerName" },
    {
      title: "Location",
      field: "location",
      render: (job) => `${job.City}, ${job.State}`,
      editComponent: (prop) => (
        <Autocomplete
          defaultValue = {prop.rowData}
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
    },
    {
      title: "Skills",
      field: "skills",
      render: (prop) => <AutoComplete dataa={prop} />,
      editComponent: (prop) => "Not Editable",
    },
  ];

  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    JobService.getAll()
      .then((response) => {
        setJobs(response.data.result);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createJob = (newJob) => {
    JobService.create(newJob)
      .then((response) => {
        console.log(response.data);
        const dataUpdate = [...jobs];
        dataUpdate.push(response.data.message);
        setJobs([...dataUpdate]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateJob = (updatedJob) => {
    JobService.update(updatedJob.JobId, updatedJob)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteJob = (favoriteId) => {
    JobService.remove(favoriteId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJobs();
    getLocationSuggestions("");
  }, []);

  const [dataMain, setData] = useState([...data]);
  return (
    <div className="table" style={{ maxWidth: "95%" }}>
      <MaterialTable
        title="Manage your database"
        localization={{
          header: {
            actions: "Edit Delete",
          },
        }}
        columns={columns}
        icons={tableIcons}
        options={{
          actionsColumnIndex: -1,
          showFirstLastPageButtons: false,
          paging: true,
        }}
        data={jobs}
        editable={{
          onRowAdd: (newData) =>
        new Promise((resolve, reject) => {
          createJob (newData);
          resolve();
        }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log('MaterialTable Update handler is called', newData);
              newData.LocationId = newData.location.value;
              newData.City = newData.location.label.split(',')[0];
              newData.State = newData.location.label.split(',')[1];
              updateJob(newData);
              setTimeout(() => {
                const dataUpdate = [...jobs];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setJobs([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              deleteJob(oldData.JobId);
              setTimeout(() => {
                const dataDelete = [...jobs];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setJobs([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
}
