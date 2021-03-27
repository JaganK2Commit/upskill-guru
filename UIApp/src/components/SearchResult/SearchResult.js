import React from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";

const stackStyles: Partial<IStackStyles> = { root: { width: 650, marginLeft: 50, marginTop: 2 } };
const buttonStyle: Partial<IStackStyles> = { root: { width: 250, marginLeft: 50, marginTop: 2 } };

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200, marginLeft: 87 },};

function SearchResult(props) {
  const { disabled, checked } = props;

  return (
    <div className="account-main">
      <HeadingStyles>Search result</HeadingStyles>

      <div className="ms-Grid main-id" dir="ltr">
      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{display:"inline-flex"}}>
          <TextField value="Software Developer" />
        </div>
      </div>

      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{display:"inline-flex"}}>
        <Label>Bar chart here</Label>
        </div>
      </div>

      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{display:"inline-flex"}}>
        <Label>World map here</Label>
        </div>
      </div>

      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{display:"inline-flex"}}>
        <PrimaryButton text="Save search result" onClick={_saveAction} allowDisabledFocus disabled={disabled} checked={checked} className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")}/>
        </div>
      </div>
      
      </div>

    </div>

  );
}

function _saveAction(): void {
  alert('Search has been saved');
      
}

const HeadingStyles = styled.span`
  
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  margin-left: 1px;
  margin-top: 9px;
  margin-bottom: 12px;
`;

export default SearchResult;


