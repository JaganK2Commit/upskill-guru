import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import WordCloudComponent from "../WordCloud/WordCloudComponent";
import { skillWordData } from "../SkillWordCloud";


function Front(props) {
  const { disabled, checked } = props;
  const [wordcloudData,setWordcloudData] = useState(skillWordData)

  return (
    <div className="front-main">

      <div className="ms-Grid main-id" dir="ltr" >
      <div style={{marginTop:'20px',position: "center"}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{display:"block"}}>
        <WordCloudComponent id="wordcloud" data={wordcloudData} />

        </div>
      </div>

      <div style={{marginTop:'20px',position: "center"}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12" style={{width:600}}>
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


