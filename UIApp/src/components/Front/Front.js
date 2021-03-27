import React from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";


function Front(props) {
  const { disabled, checked } = props;

  return (
    <div className="front-main">

      <div className="ms-Grid main-id" dir="ltr">
      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{display:"inline-flex"}}>
        <Label>Word Cloud here</Label>
        </div>
      </div>

      

      <div style={{marginTop:'20px',marginRight:'120px'}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{width:600, textAlign:"center"}}>
          <SearchBox placeholder="Enter job title to find skills on demand" onSearch={newValue => console.log('value is ' + newValue)} iconProps={{ iconName: 'Search', style: { opacity: 100,  color: 'white', cursor: 'pointer' }}} />
          
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

export default Front;


