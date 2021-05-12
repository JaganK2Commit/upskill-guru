import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import { Label} from 'office-ui-fabric-react';
import { Link } from "react-router-dom";
import http from '../../http-common';
import { UserContext } from '../../UserContext';
import Autocomplete from '../Autocomplete/Autocomplete.js';
import LocationService from "../../services/LocationService";
import { Button } from "@material-ui/core";
import SkillDataService from "../../services/SkillService";
import AutoComplete from "@material-ui/lab/Autocomplete";
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
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState();

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

  const getSkillSuggestions = async (value) => {
    const response = await SkillDataService.findSuggestions(value, 10);
    const skills = response.data.message;
    setSkills(skills);
  };

  const handleSubmit = async e => {
    const [city, state] = location != '' ? location.label.split(', ') : ['',''];

    if (!validForm()) {
      return;
    }

    e.preventDefault();
    try {
      const res = await http.post(
        `/account/register`, { 
          username, firstName, lastName, password, confirmPassword, city, state, skills
        }
      );
      
      if (res.data.message === "username taken, pick another one") {
        setUsernameError("username taken");
      }
      else {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data))
        history.push('/home');
      }
    }
    catch (err) {
      console.log(err);
      setError(err);
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
      <div style={{ position: 'absolute', 
                    left: '50%', 
                    transform: 'translate(-140%, -0%)'}}>
      <HeadingStyles>
                Create Account
      </HeadingStyles>
      </div>
      <div className="ms-Grid main-id" dir="ltr" style={{ position: 'absolute', 
                                                          left: '50%', 
                                                          transform: 'translate(-57%, -0%)'}}>
        <div style={{marginTop:'50px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label={usernameError || "Username"}
              error={usernameError}
              style={{ width: 300, marginRight: 2 }}
              size="small"
              required 
              variant="outlined"
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block", width: "316px"}}>
            <Autocomplete 
              placeholder="New York, NY"
              label="Location"
              options={locationSuggestions.map((loc) => ({
                label: `${loc.city}, ${loc.state}`,
                value: loc.locationId,
              }))}
              limitTags={1}
              handleChange={getLocationSuggestions}
              handleSelection={handleSelectedLocation} />
          </div>
        </div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label={firstNameError || "First Name"} 
              error={firstNameError}
              style={{ width: 300, marginRight: 2  }}
              size="small"
              required 
              variant="outlined"
              onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label="Last Name" 
              style={{ width: 300 }}
              size="small"
              variant="outlined"
              onChange={e => setLastName(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label={passwordError || "Password"} 
              error={passwordError}
              type="password"
              style={{ width: 300, marginRight: 2  }}
              size="small"
              variant="outlined"
              canRevealPassword
              required 
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField 
              label={passwordError || "Confirm Password"}
              error={passwordError}
              style={{ width: 300 }}
              size="small"
              variant="outlined"
              required 
              type="password"
              canRevealPassword
              onChange={e => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:'30px',marginRight:'0px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 block">
            <AutoComplete
          multiple
          borderless
          disableClearable
          limitTags={2}
          id="tags-standard"
          options={skills}
          getOptionLabel={(option) => option.SkillName || ""}
          onChange={(e, v) => {
            setSkills(v);
          }}
          renderInput={(params) => (
            <TextField
              borderless
              {...params}
              variant="outlined"
              placeholder="Add Skills"
              size="small"
              onChange={(e) => getSkillSuggestions(e.target.value)}
            />
          )}
        />

          </div> 
        </div>
        <div style={{textAlign:"center", marginRight:'100px', marginTop:'30px'}}>
             <Button 
              variant="contained" 
              onClick={handleSubmit}
              style={{
                width: "300px",
                backgroundColor: "#0078D4",
                color: "white",
              }}> 
              Create Account
              </Button>
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

