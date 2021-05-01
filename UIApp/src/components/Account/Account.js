import React, { useEffect, useContext, useState } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import styled, { css } from "styled-components";
import {
  Text, DefaultButton, IIconProps, initializeIcons, Dialog, PrimaryButton,
  DialogFooter, Label, DialogType
} from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react';
import TextField from '@material-ui/core/TextField';
import { useBoolean } from '@uifabric/react-hooks';
import { data } from '../UserData';
import AutocompleteComp from './Autocomplete'
import { UserContext } from '../../UserContext';
import httpCommon from '../../http-common';
import { useHistory } from 'react-router-dom';
import Autocomplete from '../Autocomplete/Autocomplete.js';
import LocationService from "../../services/LocationService";

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
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [userInfo, setUserInfo] = useState({
    FirstName: '',
    LastName: '',
    Username: '',
    City: '',
    State: ''
  });

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
    const response = await httpCommon.post('/account/update', userInfo);
    if (response.status == 200) {
      alert('user details updated');
    }
  }

  let newPass="";
  const handlePasswordChange = async (newPassword) => {
    // console.log({uid: user.uid, newPassword})
    const response = await httpCommon.post('/account/changePassword', {uid: user.uid, password: newPassword});
  }

  const handleSelectedLocation = (value) => {
    const [city, state] = value.split(', ');
    setUserInfo({
      ...userInfo,
      City: city,
      State: state
    });
  }

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  }

  const dialogContentProps = {
    type: DialogType.normal,
    closeButtonAriaLabel: 'Close',
    subText: <TextField placeholder="type in new password" onBlur={(e) => newPass = e.target.value} />
    // subText: <TextField onBlur={handleChange(state.name)} />
  };

  return (
    <div className="account-main">
      <HeadingStyles>Your Profile</HeadingStyles>
      <div className="ms-Grid main-id" dir="ltr">
        <div style={{ marginTop: '20px', marginRight: '120px' }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Label>First Name</Label>
          </div>
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <TextField id="t1" 
              name="FirstName"
              value={userInfo.FirstName} 
              borderless 
              autoComplete="off"
              onChange={e => handleChange(e)} 
              />
          </div>
          {/* <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <ActionButton id="" onClick={() => { toggleHideDialog(); setState({ ...state, field: userInfo.FirstName, name:"FirstName" }) }} iconProps={editIcon} style={{ marginTop: "-4px", marginRight: "300px", color: "gray" }}>Edit</ActionButton>
          </div> */}

          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Label>Last Name</Label>
          </div>
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <TextField 
              name="LastName"
              value={userInfo.LastName} 
              borderless 
              className="input-style" 
              onChange={e => handleChange(e)} />
          </div>
          {/* <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <ActionButton onClick={() => { toggleHideDialog(); setState({ ...state, field: userInfo.LastName, name:"LastName" }) }} iconProps={editIcon} style={{ marginTop: "-4px", color: "gray" }}>Edit</ActionButton>
          </div> */}
        </div>

        <div style={{ marginRight: '120px' }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Label>Username</Label>
          </div>
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <TextField 
              name="Username"
              value={userInfo.Username} 
              borderless 
              className="input-style"
              onChange={e => handleChange(e)} />
          </div>
          {/* <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <ActionButton onClick={() => { toggleHideDialog(); setState({ ...state, field: userInfo.Username, name:"Username" }) }} iconProps={editIcon} style={{ marginTop: "-4px", color: "gray" }}>Edit</ActionButton>
          </div> */}
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Label>Password</Label>
          </div>
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Link onClick={ () => toggleHideDialog() }>Change Password</Link>
            {/* <TextField 
              value={state.data.password} 
              type="password" 
              borderless 
              className="input-style" 
              onChange={e => handleChange(e)} /> */}
          </div>
          {/* <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <ActionButton onClick={() => { toggleHideDialog(); setState({ ...state, field: state.data.password, name: 'password' }) }} iconProps={editIcon} style={{ marginTop: "-4px", color: "gray" }}>Edit</ActionButton>
          </div> */}
        </div>

        <div style={{ marginRight: '120px' }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Label>Location</Label>
          </div>
          <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <Autocomplete 
              name="Location"
              value={userInfo.City + ", " + userInfo.State}
              placeholder="New York, NY"
              label=""
              options={ locationSuggestions.map((loc) => `${loc.city}, ${loc.state}`) }
              limitTags={1}
              handleChange={getLocationSuggestions}
              handleSelection={handleSelectedLocation} />
          </div>
          {/* <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}>
            <ActionButton onClick={() => { toggleHideDialog(); setState({ ...state, field: userInfo.City + ", " + userInfo.State, name: 'location' }) }} iconProps={editIcon} style={{ marginTop: "-4px", color: "gray" }}>Edit</ActionButton>
          </div> */}
          {/* <div className="ms-Grid-col ms-lg2" style={{ display: "inline-flex" }}> */}
            {/* <Label>Job title</Label> */}
          {/* </div> */}
          {/* <div className="ms-Grid-col ms-lg3" style={{display:"inline-flex"}}>
            <TextField value={state.data.jobTitle} style={{fontWeight: 'normal'}} readOnly borderless className="input-style" />
          </div> */}
          {/* <div className="ms-Grid-col ms-lg1" style={{display:"inline-flex"}}>
            <ActionButton onClick={()=> {toggleHideDialog();setState({...state,field:state.data.jobTitle,name:'jobTitle'})}} iconProps={editIcon} style={{marginTop:"-4px",color:"gray"}}>Edit</ActionButton>
          </div>   */}
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px', marginRight: '120px' }} className="ms-Grid-row">
          <HeadingStyles>Your Skills</HeadingStyles>
          <div className="ms-Grid-row" style={{ marginBottom: '10px', marginTop: '20px', marginLeft: '1px' }}>
            <div className="ms-Grid-col ms-lg10">
              <AutocompleteComp data={state.skills} />
            </div>
          </div>
        </div>
        <div className="ms-Grid-row" style={{ textAlign: "center" }}>
          <PrimaryButton onClick={() => updateUserData()}>
            Save Changes
          </PrimaryButton>
        </div>
      </div>

      <Dialog hidden={hideDialog} onDismiss={toggleHideDialog} dialogContentProps={dialogContentProps} >
        <DialogFooter>
          <PrimaryButton onClick={() => { toggleHideDialog(); handlePasswordChange(newPass) }} text="Save" />
          <DefaultButton onClick={() => { toggleHideDialog(); setState({ ...state, skills: false }) }} text="Close" />
        </DialogFooter>
      </Dialog>

      {/* <Dialog hidden={hideLocationDialog} onDismiss={toggleHideLocationDialog} dialogContentProps={dialogContentProps} >
        <DialogFooter>
          <PrimaryButton onClick={() => { toggleHideDialog(); setState({ ...state, skills: false }) }} text="Save" />
          <DefaultButton onClick={() => { toggleHideDialog(); setState({ ...state, skills: false }) }} text="Close" />
        </DialogFooter>
      </Dialog> */}

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
