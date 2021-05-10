import React, { useState, useContext } from "react";
import  { useHistory } from 'react-router-dom'
import styled, { css } from "styled-components";
import TextField from '@material-ui/core/TextField';
import { PrimaryButton, Label } from 'office-ui-fabric-react';
import { Link } from "react-router-dom";
import { ColorClassNames} from "@uifabric/styling";
import http from '../../http-common';
import { UserContext } from '../../UserContext';
import { Button } from "@material-ui/core";

function Login() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await http.post(`/account/login?username=${username}&password=${password}`);

    // if login was successful
    if (res.data.token) {
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data))
      history.push('/home');
    }
  }

  return (
    <div>
      
      <div className="ms-Grid main-id" dir="ltr"
            style={{ position: 'absolute', 
            left: '46%', 
            top: '50%',
            transform: 'translate(-75%, -0%)'}}>
        {/* <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
        </div></div> */}
        <HeadingStyles 
            style={{ position: 'absolute', 
            left: '50%', 
            transform: 'translate(-75%, 30%)'}}>
              Login
        </HeadingStyles>
        <div className="ms-Grid main-id" dir="ltr" style={{ position: 'absolute', 
                                                          left: '50%', 
                                                          transform: 'translate(-40%, -0%)'}}>
        <div style={{marginTop:'70px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12" style={{display:"inline-block"}}>
            <TextField 
              label="Username" 
              style={{ width: 300, marginRight: 2 }}
              size="small"
              required 
              variant="outlined"
              onChange={e => setUsername(e.target.value)}  />
          </div>
        </div>
        <div style={{marginTop:'20px' }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12" style={{display:"inline-block"}}>
            <TextField 
              type="password"
              label="Password" 
              style={{ width: 300, marginRight: 2 }}
              size="small"
              required 
              variant="outlined"
              onChange={e => setPassword(e.target.value)}/>
          </div>
        </div>
        <div style={{marginTop:'20px'}} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12" style={{display:"inline-block"}}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                width: "300px",
                backgroundColor: "#0078D4",
                color: "white",
              }}> 
              Login
            </Button>
          </div>
        </div>
        <div style={{marginTop:'20px'}} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12" style={{display:"inline-block"}}>
          <Label>If you don't have an account, <Link to="/CreateAccount" >create account</Link> here</Label>
          </div>
        </div>
        </div>

     </div>
     </div>
  );
}


const HeadingStyles = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  margin-left: 1px;
  margin-top: 9px;
`;

export default Login;

