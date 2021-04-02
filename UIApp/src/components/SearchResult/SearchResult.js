import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";

import BarChart from "../Charts/BarChart/BarChart";
import {barChartData} from "../BarChartData";

import BubbleChart from "../Charts/BubbleChart/BubbleChart";
import { bubbleChartData } from "../BubbleChartData";

function SearchResult(props) {
  const { disabled, checked } = props;
  const [barGraphData,setBarGraphData] = useState(barChartData)

  const [bubbleGraphData,setBubbleGraphData] = useState(bubbleChartData)
  const [pythonChecked,setPythonChecked] = useState(true)
  const [mysqlChecked,setMysqlChecked] = useState(true)
  const [javascriptChecked,setJavascriptChecked] = useState(true)

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
        <div className="ms-Grid-col ms-lg12" style={{display:"block"}}>
        <Label>Bar chart here</Label>
        
        <BarChart style={{fill: "#3268a8"}} id="barChart" data={barGraphData} />
      
        </div>

        <div className="ms-Grid-col ms-lg12" style={{display:"block"}}>
          <Label>Bar chart here</Label>
          <BubbleChart style={{width: "80%", float: "left"}} id="bubbleChart" data={bubbleGraphData} />
            <div style={{width: "20%",  height: "500px", float: "right"}}>
              <input type="checkbox" className="checkbox" value="Python" checked={pythonChecked} onChange={(e)=>setPythonChecked(!pythonChecked)} /><label>Python</label><br />
              <input type="checkbox" className="checkbox" value="MySQL" checked={mysqlChecked} onChange={(e)=>{setMysqlChecked(!mysqlChecked)}} /><label>MySQL</label><br />
              <input type="checkbox" className="checkbox" value="Javascript" checked={javascriptChecked} onChange={(e)=>{setJavascriptChecked(!javascriptChecked)}} /><label>Javascript</label>
            </div>
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

function _saveAction() {
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


