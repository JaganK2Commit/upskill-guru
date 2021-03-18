import React from "react";
import styled, { css } from "styled-components";
import { TextField, MaskedTextField  } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const stackStyles: Partial<IStackStyles> = { root: { width: 650, marginLeft: 50 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 },};
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


function CreateAccount(props) {
  const { disabled, checked } = props;
  return (
    <Stack horizontal styles={stackStyles}>
      <Stack class="ms-Fabric">
      <HeadingStyles>Create Account</HeadingStyles>
      <TextField label="Username" required />
      <TextField label="Password" required />
      <TextField label="Email" required />
      <TextField label="First Name" required />
      <TextField label="Last Name" />
      <TextField label="Location" />
      <Dropdown
      placeholder="Select multiple options"
      label="Your Skills"
      multiSelect
      options={DropdownControlledMultiExampleOptions}
      styles={dropdownStyles}
    />
      <Label></Label><Label></Label>
      <PrimaryButton color = "blue" text="Save" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} styles={ButtonStyle} />
      </Stack>
     
    </Stack>
   
  );
}

function _alertClicked(): void {
  alert('Clicked');
}

const HeadingStyles = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  margin-left: 1px;
  margin-top: 9px;
`;

export default CreateAccount;

