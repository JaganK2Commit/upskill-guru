import React, { useState, useContext } from "react";
import  { Redirect } from 'react-router-dom'
import styled, { css } from "styled-components";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, Label } from 'office-ui-fabric-react';
import { Link } from "react-router-dom";
import { ColorClassNames} from "@uifabric/styling";
import { skillsData } from '../SkillData';
import http from '../../http-common';
import { UserContext } from '../../UserContext';

function Login(props) {
  const { disabled, checked } = props;

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await http.get(`/api/login?username=${username}&password=${password}`);

    console.log(res.data);
    if (res.data.token) {
      setUser(res.data);
      localStorage.setItem('token', res.data.token);
      // return <Redirect to='/' />
    }
  }

  const [state, setState] = React.useState({
    data:skillsData[0],
    field:null,
    skills:false,
    name:null,
  })
  return (
    <div>
      <HeadingStyles>Login</HeadingStyles>
      <div className="ms-Grid main-id" dir="ltr">
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
          <TextField label="Username" style={{width:300}} required onChange={e => setUsername(e.target.value)} />
        </div></div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
          <TextField label="Password" type="password" canRevealPassword style={{width:300}} required onChange={e => setPassword(e.target.value)} />
        </div></div>
        <div style={{ marginTop:'40px'}}>
          <PrimaryButton text="Login" onClick={handleSubmit} allowDisabledFocus style={{width:335}} disabled={disabled} checked={checked} className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")} />
        </div>
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

