import React from "react";
import styled, { css } from "styled-components";
import { TextField, MaskedTextField  } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, IButtonProps, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import { useHistory } from "react-router-dom";

const stackStyles: Partial<IStackStyles> = { root: { width: 650, marginLeft: 50, marginTop: 2 } };
const buttonStyle: Partial<IStackStyles> = { root: { width: 250, marginLeft: 0, marginTop: 2 } };

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 250, marginLeft: 0 },};
const DropdownControlledMultiExampleOptions = [
  { key: 'React.js', text: 'React.js' },
  { key: 'PHP', text: 'PHP' },
  { key: 'Python', text: 'Python' },
  { key: 'C++', text: 'C++' },
  { key: 'Javascript', text: 'Javascript' },
  { key: 'AWS', text: 'AWS' },
  { key: 'Java', text: 'Java' },
  { key: 'Statistics', text: 'Statistics' },
];
function AccountEdit(props) {
  const { disabled, checked } = props;
  let history = useHistory();

  function handleClick() {
    history.push("./AccountEdit");
  }
  function backClick() {
    history.push("/Account");
  }
  return (
    <Stack>
    <Stack horizontal styles={stackStyles}>
      <Stack >
      <HeadingStyles>Your Profile</HeadingStyles>
      <Stack style={{flexDirection: 'row'}}>
      <Stack> 
        <FieldLabel>Username</FieldLabel>
        <FieldLabel>Last Name</FieldLabel>
        <FieldLabel>First name</FieldLabel>
        <FieldLabel>Location</FieldLabel>
        <FieldLabel>Email</FieldLabel>
        <FieldLabel>Skills</FieldLabel>
      </Stack>
      <Stack> 
        <TextField placeholder="username" required />
        <TextField placeholder="last name" />
        <TextField placeholder="first name" />
        <TextField placeholder="location" />
        <TextField placeholder="email" required />
        <Label></Label>
        <ValueLabel>skill1 </ValueLabel>
        <ValueLabel>skill2 </ValueLabel>
        <Dropdown
           placeholder="Add new skill"
           multiSelect
           options={DropdownControlledMultiExampleOptions}
           styles={dropdownStyles}
    />
      <Label></Label><Label></Label>
      
      <Stack styles={buttonStyle}>
      <Label></Label>
      <PrimaryButton text="Save" onClick={backClick} styles={buttonStyle} allowDisabledFocus disabled={disabled} checked={checked} className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")}/>
    
      </Stack>
      </Stack>
      </Stack>

      
      </Stack>
      <Stack>
      </Stack>
      
    <Label></Label>
     
    
    </Stack>
   </Stack>

  );
}


function _alertClickedDelete(): void {
  alert('Delete');
}
function _editAction(): void {
      window.location.href.indexOf('AccountEdit');
      
}

const HeadingStyles = styled.span`
  
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  margin-left: 1px;
  margin-top: 9px;
  margin-bottom: 12px;
`;

const FieldLabel = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-left: 1px;
  margin-right: 20px;
  margin-bottom: 13px;
`;

const ValueLabel = styled.span`
  font-style: normal;
  font-size: 14px;
  margin-left: 2px;
  margin-bottom: 15px;
`;

const EditLabel = styled.span`
  font-style: normal;
  color: #696969;
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 5px;
`;
export default AccountEdit;

