import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import { PrimaryButton, Label} from 'office-ui-fabric-react';
import { ColorClassNames } from "@uifabric/styling";
import AutocompleteComp from './Autocomplete';
import { Link } from "react-router-dom";
import http from '../../http-common';
import { UserContext } from '../../UserContext';
import Autocomplete from '../Autocomplete/Autocomplete.js';
import LocationService from "../../services/LocationService";

function CreateAccount(props) {
  const { disabled, checked } = props;
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [location, setLocation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skills, setSkills] = useState('');

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSelectedLocation = (value) => {
    setLocation(value);
  }

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  }

  const handleSubmit = async e => {
    // console.log(location);
    const [city, state] = location.split(', ')

    if (!validForm()) {
      return;
    }

    e.preventDefault();
    try {
      const res = await http.post(
        `/register`, { 
          username, firstName, lastName, password, confirmPassword, city, state
        }
      );
      
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data))
      history.push('/home');
    }
    catch (err) {
      console.log(err);
    }
  }

  const validForm = () => {
    let isValid = true;
    
    if (!username || username === '') {
      setUsernameError('username cannot be empty');
      isValid = false;
    }
    else {
      setUsernameError('');
    }
    if (!firstName || firstName === '') {
      setFirstNameError('first name cannot be empty');
      isValid = false;
    }
    else {
      setFirstNameError('');
    }
    if (!password || password === '') {
      setPasswordError('password cannot be empty');
      isValid = false;
    }
    else if (password !== confirmPassword) {
      setPasswordError('password does not match with passwordConfirm');
      isValid = false;
    }
    else {
      setPasswordError('');
    }

    return isValid;
  }

  return (
    <div>
      <HeadingStyles>Create Account</HeadingStyles>
      <div className="ms-Grid main-id" dir="ltr">
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label="Username" 
              required 
              errorMessage={usernameError}
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <Autocomplete 
              placeholder="New York, NY"
              label="Location"
              options={ locationSuggestions.map((loc) => `${loc.city}, ${loc.state}`) }
              limitTags={1}
              handleChange={getLocationSuggestions}
              handleSelection={handleSelectedLocation} />
          </div>
        </div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label="First Name" 
              required 
              errorMessage={firstNameError}
              onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="Last Name" onChange={e => setLastName(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label="Password" 
              type="password"
              canRevealPassword
              required 
              errorMessage={passwordError}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label="Confirm Password" 
              required 
              type="password"
              canRevealPassword
              onChange={e => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:'30px',marginRight:'0px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 block">
            <AutocompleteComp data={skills} />
          </div> 
        </div>
        <div style={{textAlign:"center", marginRight:'100px', marginTop:'30px'}}>
          <PrimaryButton 
            text="Create account" 
            onClick={handleSubmit} 
            style={{width:300}} 
            disabled={disabled} 
            className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")} />
        </div>
        <div style={{textAlign:"center", marginRight:'100px', marginTop:'30px'}}>
            <Label>If you already have an account, please <Link to="/Login" >login here</Link></Label>
        </div>
     </div>
     </div>
  );
}



const HeadingStyles = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-left: 1px;
  margin-top: 9px;
`;

export default CreateAccount;

