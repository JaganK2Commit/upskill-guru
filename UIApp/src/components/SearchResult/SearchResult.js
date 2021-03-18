import React from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";

const stackStyles: Partial<IStackStyles> = { root: { width: 650, marginLeft: 50, marginTop: 2 } };
const buttonStyle: Partial<IStackStyles> = { root: { width: 250, marginLeft: 50, marginTop: 2 } };

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200, marginLeft: 87 },};

function SearchResult(props) {
  const { disabled, checked } = props;

  return (
    <Stack>
    <Stack horizontal styles={stackStyles}>
      <Stack>
      <HeadingStyles>Search</HeadingStyles>
      <Stack>
      
      
      </Stack>
      </Stack>


      </Stack>
   
   
      <Stack styles={buttonStyle}>
      <Label></Label>
      <PrimaryButton text="Edit" onClick={_editAction} allowDisabledFocus disabled={disabled} checked={checked} className={[ColorClassNames.whiteBackground, ColorClassNames.black].join(" ")}/>
    
  
    </Stack>
    <Stack>
      
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
export default SearchResult;


