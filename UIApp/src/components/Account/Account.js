import React, { useEffect, useContext, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import styled, { css } from "styled-components";
import {
  Text, DefaultButton, IIconProps, initializeIcons, Dialog, PrimaryButton,
  DialogFooter, Label, DialogType
} from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useBoolean } from '@uifabric/react-hooks';
import { data } from '../UserData';
import AutocompleteComp from './Autocomplete'
import { UserContext } from '../../UserContext';
import httpCommon from '../../http-common';
import { useHistory } from 'react-router-dom';
import LocationService from "../../services/LocationService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SkillDataService from "../../services/SkillService";

const editIcon = { iconName: 'edit' };

const btnStyle = {
  backgroundColor: "red",
  width: "200px",
  marginRight: '200px',
  marginTop: '50px'
};
const textFieldStyle = {
  corder: "0px"
};
export default function Account() {
  initializeIcons();
  const history = useHistory();

  const { user } = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [userInfo, setUserInfo] = useState({
    FirstName: '',
    LastName: '',
    Username: '',
    Skills: [],
    City: '',
    State: '',
    LocationId: ''
  });

  const getSkillSuggestions = async (value) => {
    const response = await SkillDataService.findSuggestions(value, 10);
    const skills = response.data.message;
    setSkills(skills);
  };

  const findUserById = async () => {
    try {
      const response = await httpCommon.get('/account?uid=' + user.uid);
      return response.data.userData;
    }
    catch (error) {
      console.log(`Unable to find user by uid: ${user.uid}`);
    }
  }

  useEffect(() => {
    if (user) {
      const data = findUserById().then((data) => setUserInfo(data));
    }
    else {
      console.log("Not authorized to access this page!");
      history.push('/');
    }
  }, []);

  const [state, setState] = React.useState({
    data: data[0],
    field: null,
    skills: false,
    name: null,
  })

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const handleChange = (e) => {
    if (e) {
      const fields = {...userInfo};
      fields[e.target.name] = e.target.value;
      setUserInfo(fields);
    }
  };
  
  const updateUserData = async () => {
    if (userInfo.Username === "") {
      alert("username cannot be blank");
    }
    else if (userInfo.City === "") {
      alert("location must have a value");
    }
    else if (userInfo.State === "") {
      alert("location must have a value");
    }
    else {
      const response = await httpCommon.post('/account/update', userInfo);
      if (response.status == 200) {
        alert('user details updated');
      }
    }
  }

  let newPass="";
  const handlePasswordChange = async (newPassword) => {
    const response = await httpCommon.post('/account/changePassword', {uid: user.uid, password: newPassword});
  }

  const handleSelectedLocation = (value) => {
    if (value) {
      const [city, state] = value.label.split(', ');
      setUserInfo({
        ...userInfo,
        City: city,
        State: state,
        LocationId: value.locationId
      });
    }
  }

  const handleSelectedSkill = (value) => {
    if (value) {
      const data = {...userInfo};
      data.Skills = value;
      setUserInfo(data);
    }
  }

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  }

  const dialogContentProps = {
    type: DialogType.normal,
    closeButtonAriaLabel: 'Close',
    subText: <TextField 
                placeholder="type in new password" 
                variant="outlined"
                style={{ width: "300px" }}
                margin="dense"
                onBlur={(e) => newPass = e.target.value} />
 
  };

  return (

    <div>
      {userInfo && 
      <div className="account-main">
     
      
      <div className="ms-Grid main-id" dir="ltr" style={{ 
                                                          left: '30%', 
                                                          transform: 'translate(1%, -0%)'}}>
        <div style={{ marginTop: '0px', marginRight: '0px' }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12" style={{ display: "inline-flex" }}>
            <HeadingStyles>Your Profile</HeadingStyles>
          </div>
        </div>
        <div style={{ marginTop: '10px', marginRight: '0px' }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{ display: "inline-block" }}>
            <TextField id="t1" 
              name="FirstName"
              value={userInfo.FirstName} 
              variant="outlined"
              label="First Name"
              style={{ width: "400px" }}
              margin="dense"
              autoComplete="off"
              onChange={e => handleChange(e)} 
              />
          </div>
         
          <div className="ms-Grid-col ms-lg6" style={{ display: "inline-block" }}>
            <TextField 
              name="LastName"
              value={userInfo.LastName} 
              variant="outlined"
              label="Last Name"
              style={{ width: "400px" }}
              margin="dense" 
              className="input-style" 
              onChange={e => handleChange(e)} />
          </div>
         
        </div>

        <div style={{ marginTop: '20px', marginRight: '0px' }} className="ms-Grid-row">
         
          <div className="ms-Grid-col ms-lg6" style={{ display: "inline-block" }}>
            <TextField 
              name="Username"
              value={userInfo.Username} 
              label="Username"
              variant="outlined"
              style={{ width: "400px" }}
              margin="dense" 
              className="input-style"
              onChange={e => handleChange(e)} />
          </div>
        
           <div className="ms-Grid-col ms-lg6" style={{ display: "inline-block", marginTop: '8px', width: "415px" }}>
           {userInfo.Username && <Autocomplete
              disableClearable
              limitTags={1}
              options={ locationSuggestions?.map((loc) => ({ label:`${loc.city}, ${loc.state}`, value: loc.locationId  })) }
              getOptionLabel={(loc) => `${loc.label}`}
              defaultValue={{
                label: `${userInfo.City}, ${userInfo.State}`,
                value: userInfo.LocationId,
              }}
              onChange={(e, v) => handleSelectedLocation(v)}
              renderInput={(params) => (
                <TextField
                borderless
                {...params}
                  variant="outlined"
                  placeholder={`New York, NY`}
                  size="small"
                  onChange={(e) => getLocationSuggestions(e.target.value)}
                  />
              )}
            />}
          </div>
         
        </div>

        <div style={{ marginTop: '20px', marginRight: '0px' }} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg6" style={{ display: "inline-block" }}>
          {userInfo.Username && <Autocomplete
            multiple
            borderless
            disableClearable
            limitTags={5}
            id="tags-standard"
            options={ skills }
            getOptionLabel={(Skills) => Skills.SkillName || ""}
            onChange={(e, v) => { handleSelectedSkill(v); }}
            defaultValue={userInfo.Skills?.map((s, i) => ({
              SkillId: s.SkillId,
              SkillName: s.SkillName,
            }))}
            renderInput={(params) => (
              <TextField
                borderless
                {...params}
                variant="outlined"
                style={{ width: 400, marginTop: '15px',  }}
                placeholder="add skills"
                size="small"
                onChange={(e) => getSkillSuggestions(e.target.value)}
              />
            )}
          />}
        </div>
        <div className="ms-Grid-col ms-lg6" style={{ marginTop: '12px', width: "415px", display: "inline-block" }}>
            <Button 
                variant="outlined"
                size="large"
                style={{ width: "400px" }} 
                onClick={ () => toggleHideDialog() }>Change Password
            </Button>
           
          </div>
         
        
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px', marginRight: '0px' }} className="ms-Grid-row">
        
          <div className="ms-Grid-row" style={{ marginBottom: '10px', marginTop: '20px', marginLeft: '1px' }}>
           
          </div>
        </div>
        <div className="ms-Grid-row" style={{ textAlign: "center", marginRight: '120px' }}>
          <Button 
              style={{
                backgroundColor: "#0078D4",
                color: "white",
                width: "300px"
              }} 
              onClick={() => updateUserData()}>
            Save Changes
          </Button>
        </div>
      </div>

      <Dialog hidden={hideDialog} onDismiss={toggleHideDialog} dialogContentProps={dialogContentProps} >
        <DialogFooter>
          <PrimaryButton 
              style={{
                backgroundColor: "#0078D4",
                color: "white",
                width: "50px"
              }}  
              onClick={() => { toggleHideDialog(); handlePasswordChange(newPass) }} text="Save" />
          <DefaultButton onClick={() => { toggleHideDialog(); setState({ ...state, skills: false }) }} text="Close" />
        </DialogFooter>
      </Dialog>


    </div>}
    </div>

    
  )
}

const HeadingStyles = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 9px;
  margin-bottom: 12px;
`;
