import React from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import BarChart from '../Charts/BarChart';
import * as d3 from "d3";

const stackStyles: Partial<IStackStyles> = { root: { width: 650, marginLeft: 50, marginTop: 2 } };
const buttonStyle: Partial<IStackStyles> = { root: { width: 250, marginLeft: 50, marginTop: 2 } };

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200, marginLeft: 87 },};

function SearchResult(props) {
  const { disabled, checked } = props;
  
  // let data = d3.range(5).map((item, index) => ({
  //   index: index,
  //   label: index,
  //   value: Math.random() * 100
  // }));
  // console.log(data)

  const data = [
    { index: 0, label: 'SQL', value: 15 },
    { index: 1, label: 'React.JS', value: 17 },
    { index: 2, label: 'NoSQL', value: 30 },
    { index: 3, label: 'Javascript', value: 10 },
    { index: 4, label: 'Java', value: 5 }
  ]

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
          <BarChart 
            data={data}
            width={800}
            height={200}
            top={20}
            bottom={30}
            left={30}
            right={0} />
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


