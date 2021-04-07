import React, { useEffect, useContext } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import styled, { css } from "styled-components";
import { Text, TextField, DefaultButton, IIconProps, initializeIcons, ActionButton, Dialog, PrimaryButton,
DialogFooter, Label, DialogType} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import {data} from '../UserData';
import AutocompleteComp from './Autocomplete'
import { UserContext } from '../../UserContext';
import httpCommon from '../../http-common';
import { useHistory } from 'react-router-dom';

const editIcon = { iconName: 'edit' };

const btnStyle ={
  backgroundColor:"red",
  width:"200px",
  marginRight:'200px',
  marginTop:'50px'
};
const textFieldStyle ={
  corder: "0px"
};
export default function Account() {
  initializeIcons();
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      httpCommon.get('/account?token=' + user.token)
    }
    else {
      console.log("Not authorized to access this page!");
      history.push('/');
    }
  }, []);

  const [state, setState] = React.useState({
    data:data[0],
    field:null,
    skills:false,
    name:null,
  })

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const handleChange = (props) =>(event)=> {
    setState({...state,data:{
      ...state.data,[props]:event.target.value,
    }})
  };
  const dialogContentProps = {
    type: DialogType.normal,
    closeButtonAriaLabel: 'Close',
    subText: <TextField defaultValue={state.field} onBlur={handleChange(state.name)} />,
  };
  return (
    <div className="account-main">
      <HeadingStyles>Your Profile</HeadingStyles>
      <div className="ms-Grid main-id" dir="ltr">
      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <Label>First Name</Label>
          </div>
        <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <TextField id="t1" value={state.data.firstName} style={{fontWeight: 'normal'}} readOnly borderless  className="input-style" />
        </div>
        <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
          <ActionButton id="" onClick={()=> {toggleHideDialog();setState({...state,field:state.data.firstName,name:'firstName'})}}  iconProps={editIcon} style={{marginTop:"-4px", marginRight:"300px",color:"gray"}}>Edit</ActionButton>
        </div>
        
        <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <Label>Last Name</Label>
          </div>
        <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
          <TextField value={state.data.lastName} style={{fontWeight: 'normal'}} readOnly borderless className="input-style" />
        </div>
        <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
          <ActionButton onClick={()=> {toggleHideDialog();setState({...state,field:state.data.lastName,name:'lastName'})}} iconProps={editIcon} style={{marginTop:"-4px",color:"gray"}}>Edit</ActionButton>
        </div>
      </div>
      <div style={{marginRight:'120px'}} className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <Label>Username</Label>
          </div>
            <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
              <TextField value={state.data.username} style={{fontWeight: 'normal'}} readOnly borderless className="input-style" />
              </div>
              <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
              <ActionButton onClick={()=> {toggleHideDialog();setState({...state,field:state.data.username,name:'username'})}} iconProps={editIcon} style={{marginTop:"-4px",color:"gray"}}>Edit</ActionButton>
            </div>
            <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <Label>Password</Label>
          </div>
            <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
              <TextField value={state.data.password} type="password" style={{fontWeight: 'normal'}} readOnly borderless className="input-style" />
              </div>
              <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
              <ActionButton onClick={()=> {toggleHideDialog();setState({...state,field:state.data.password,name:'password'})}} iconProps={editIcon} style={{marginTop:"-4px",color:"gray"}}>Edit</ActionButton>
            </div>
      </div>
      <div style={{marginRight:'120px'}} className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <Label>Location</Label>
          </div>
            <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
              <TextField value={state.data.location} style={{fontWeight: 'normal'}} readOnly borderless className="input-style" />
              </div>
            <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
              <ActionButton onClick={()=> {toggleHideDialog();setState({...state,field:state.data.location,name:'location'})}} iconProps={editIcon} style={{marginTop:"-4px",color:"gray"}}>Edit</ActionButton>
            </div>
            <div className="ms-Grid-col ms-lg2" style={{display:"inline-flex"}}>
        <Label>Job title</Label>
          </div>
            <div className="ms-Grid-col ms-lg3" style={{display:"inline-flex"}}>
              <TextField value={state.data.jobTitle} style={{fontWeight: 'normal'}} readOnly borderless className="input-style" />
              </div>
            <div className="ms-Grid-col ms-lg1" style={{display:"inline-flex"}}>
              <ActionButton onClick={()=> {toggleHideDialog();setState({...state,field:state.data.jobTitle,name:'jobTitle'})}} iconProps={editIcon} style={{marginTop:"-4px",color:"gray"}}>Edit</ActionButton>
            </div>  
          </div>
      <div style={{marginTop:'20px',marginBottom:'20px',marginRight:'120px'}} className="ms-Grid-row">
            <HeadingStyles>Your Skills</HeadingStyles>
             <div className="ms-Grid-row" style={{marginBottom:'10px',marginTop:'20px', marginLeft:'1px'}}>
             <div className="ms-Grid-col ms-lg10">
               <AutocompleteComp data={state.skills} />
             </div> 
             </div>
        </div>
        <div className="ms-Grid-row" style={{textAlign:"center"}}>
          <PrimaryButton style={btnStyle}>Delete Account</PrimaryButton>
        </div>
      </div>
      
        <Dialog hidden={hideDialog} onDismiss={toggleHideDialog} dialogContentProps={dialogContentProps} >
          <DialogFooter>
           <PrimaryButton onClick={()=>{toggleHideDialog();setState({...state,skills:false})}} text="Save" />
            <DefaultButton onClick={()=>{toggleHideDialog();setState({...state,skills:false})}} text="Close" />
          </DialogFooter>
        </Dialog>

    </div>
  )
}
function _changePassword() {
  alert('Password changed');
}
const HeadingStyles = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 9px;
  margin-bottom: 12px;
`;
