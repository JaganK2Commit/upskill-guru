import React, { useState, useContext } from "react";
import  { useHistory } from 'react-router-dom'
import styled, { css } from "styled-components";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, Label } from 'office-ui-fabric-react';
import { Link } from "react-router-dom";
import { ColorClassNames} from "@uifabric/styling";
import http from '../../http-common';
import { UserContext } from '../../UserContext';

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
            left: '50%', 
            top: '50%',
            transform: 'translate(-75%, -0%)'}}>
        {/* <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
        </div></div> */}
        <HeadingStyles 
            style={{ position: 'absolute', 
            left: '50%', 
            transform: 'translate(-75%, -0%)'}}>
              Login
        </HeadingStyles>
        <div style={{marginTop:'50px'}}>
          <TextField label="Username" styles={{root: {width: 300}}} required onChange={e => setUsername(e.target.value)} />
          <TextField label="Password" type="password" canRevealPassword styles={{root: {width: 300}}} required onChange={e => setPassword(e.target.value)} />
          <PrimaryButton 
            text="Login" 
            onClick={handleSubmit} 
            allowDisabledFocus 
            styles={{root: {width: 100, marginTop: 15}}} 
            className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")} />
        </div>
        {/* <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
        </div></div> */}
        {/* <div style={{ marginTop:'40px'}}>
        </div> */}
        <div style={{ marginTop:'30px'}}>
            <Label>If you don't have an account, <Link to="/CreateAccount" >create account</Link> here</Label>
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

export default Login;

