import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, TextField, IStackTokens } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { skillWordData } from "../SkillWordCloud";
import { Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import SearchService from "../../services/SearchService";
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import WordCloudComponent from "../WordCloud/WordCloudComponent";
import CreateAccount from "../CreateAccount/CreateAccount";



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
                    left: '45%', 
                    top: '50%',
                    transform: 'translate(-55%, -0%)'}}>

      <div className="ms-Grid-row"> 
        <div className="ms-Grid-col ms-lg12" style={{display:"block"}}>
        <WordCloudComponent id="wordcloud" data={wordcloudData} />
        </div>
      </div>

      <div className="ms-Grid-row" style={{marginTop:'20px',position: "center",marginLeft:'30px'}}>
        <div className="ms-Grid-col ms-lg4" style={{display:"inline-block",marginLeft:'80px'}}>
          <Button 
              href="/CreateAccount" 
              variant="contained" 
              style={{
                width: "200px",
                backgroundColor: "#0078D4",
                color: "white",
              }}> 
             Register
          </Button>
    
         </div>
         <div className="ms-Grid-col ms-lg4" style={{display:"inline-block",marginLeft:'80px'}}>
          <Button 
              href="/login" 
              variant="contained" 
              style={{
                width: "200px",
                backgroundColor: "#0078D4",
                color: "white",
              }}> 
             Login
          </Button>
         </div>
      </div>
      
      </div>

    </div>

  );
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


