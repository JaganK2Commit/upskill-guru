import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import SearchService from "../../services/SearchService";
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import WordCloudComponent from "../WordCloud/WordCloudComponent";
import { skillWordData } from "../SkillWordCloud";
import Autocomplete from './Autocomplete'

function Front(props) {
  const { disabled, checked } = props;
  const [wordcloudData,setWordcloudData] = useState(skillWordData)
  const [searchTitle, setSearchTitle] = useState("");

  const [pythonChecked, setPythonChecked] = useState(true);
  const [mysqlChecked, setMysqlChecked] = useState(true);
  const [javascriptChecked, setJavascriptChecked] = useState(true);


  const searchHandle = async () => {
    const response = await SearchService.get(searchTitle);

  };
  return (
    <div className="front-main">

      <div className="ms-Grid main-id" dir="ltr" 
           style={{ position: 'absolute', 
                    left: '50%', 
                    top: '50%',
                    transform: 'translate(-65%, -0%)'}}>
      <div className="ms-Grid-row"> 
 
        <div className="ms-Grid-col ms-lg12" style={{display:"block"}}>
        <WordCloudComponent id="wordcloud" data={wordcloudData} />

        </div>
      </div>

      <div style={{marginTop:'20px',position: "center"}} className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg10" style={{width:600}}>
          <Autocomplete
               onChange={(e) => console.log('Search ')}
            />
       </div>
       </div>
       <div style={{marginTop:'20px',position: "center"}} className="ms-Grid-row">
       <div
            className="ms-Grid-col ms-lg12"
            style={{ display: "block",
                     textAlign: "center" }}
          >
            <PrimaryButton
              text="Search"
              onClick={searchHandle}
              allowDisabledFocus
              disabled={disabled}
              checked={checked}
              className={[
                ColorClassNames.blueBackground,
                ColorClassNames.white,
              ].join(" ")}
            />
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


