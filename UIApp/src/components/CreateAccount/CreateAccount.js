import React from "react";
import styled, { css } from "styled-components";
import { TextField, MaskedTextField  } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, Label} from 'office-ui-fabric-react';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import AutocompleteComp from './Autocomplete'
import { skillsData } from '../SkillData';
import { Link } from "react-router-dom";

function CreateAccount(props) {
  const { disabled, checked } = props;

  function _createAccClicked(): void {
    alert('Account created');
  }

  const [state, setState] = React.useState({
    data:skillsData[0],
    field:null,
    skills:false,
    name:null,
  })
  return (
    <div>
      <HeadingStyles>Create Account</HeadingStyles>
      <div className="ms-Grid main-id" dir="ltr">
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="Username" required />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="Location" />
          </div>
        </div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="First Name" required />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="Last Name" />
          </div>
        </div>
        <div style={{marginTop:'20px',marginRight:'100px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="Password" required />
          </div>
          <div className="ms-Grid-col ms-lg6" style={{display:"inline-block"}}>
            <TextField label="Confirm Password" required />
          </div>
        </div>
        <div style={{marginTop:'30px',marginRight:'0px', }} className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 block">
            <AutocompleteComp data={state.skills} />
          </div> 
        </div>
        <div style={{textAlign:"center", marginRight:'100px', marginTop:'30px'}}>
          <PrimaryButton text="Create account" onClick={_createAccClicked} allowDisabledFocus style={{width:300}} disabled={disabled} checked={checked} className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")} />
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

