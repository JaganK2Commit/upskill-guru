import React from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import { useHistory } from "react-router-dom";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

const stackStyles: Partial<IStackStyles> = { root: { width: 650, marginLeft: 50, marginTop: 2 } };
const buttonStyle: Partial<IStackStyles> = { root: { width: 250, marginLeft: 50, marginTop: 2 } };

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200, marginLeft: 87 },};

function Account(props) {
  const { disabled, checked } = props;

  let history = useHistory();
  function editClick() {
    history.push("/AccountEdit");
  }
  function changeClick() {
    history.push("/ChangePassword");
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
        <ValueLabel>username </ValueLabel>
        <ValueLabel>last name  </ValueLabel>
        <ValueLabel>first name  </ValueLabel>
        <ValueLabel>location </ValueLabel>
        <ValueLabel>email </ValueLabel>
        <ValueLabel>skill_1, skill_2, skill_3, skill_4, skill_5 </ValueLabel>
      </Stack>
      </Stack>
      </Stack>
      </Stack>
      <Stack>
      </Stack>
      <Stack horizontal styles={stackStyles}>
        <Stack>
          <FieldLabel>Password</FieldLabel>
        </Stack>
        <Stack>
          <ValueLabel>**************  &nbsp;</ValueLabel><Label> &nbsp;</Label>
          <Label> &nbsp;</Label>
        </Stack>
        <Stack>
        <Label> </Label>
        </Stack>
        <Stack>
     
        </Stack>
      </Stack>
      <Stack styles={buttonStyle}>
      <Label></Label>
      <PrimaryButton text="Edit" onClick={editClick} allowDisabledFocus disabled={disabled} checked={checked} className={[ColorClassNames.whiteBackground, ColorClassNames.black].join(" ")}/>
    

      
    <Label></Label>
     
      <Stack>
      <Label></Label><Label></Label>
      <DefaultButton className={[ColorClassNames.redBackground, ColorClassNames.white].join(" ")} onClick={_alertClickedDelete} allowDisabledFocus disabled={disabled} checked={checked}>
         Delete account
      </DefaultButton>
      </Stack>
    </Stack>
   </Stack>

  );
}


function _alertClickedDelete(): void {
  alert('Delete');
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

const EditLabel = styled.span`
  font-style: normal;
  color: #696969;
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 5px;
`;
export default Account;

