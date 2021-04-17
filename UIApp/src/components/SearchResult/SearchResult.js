import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from "office-ui-fabric-react";
import { IDropdownStyles } from "office-ui-fabric-react/lib/Dropdown";
import { ColorClassNames, FontClassNames } from "@uifabric/styling";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import BarChart from "../Charts/BarChart/BarChart";
import SearchService from "../../services/SearchService";
import AutocompleteJobTitle from './AutocompleteJobTitle'
import {jobTitlesData} from './JobTitles';
import AutocompleteLocation from './AutocompleteLocation'
import {locationData} from './Locations';
import BubbleChart from "../Charts/BubbleChart/BubbleChart";
import { barChartDataMapping } from "../../helper/barChartDataMapping";
import WordCloudJobs from "./WordCloudJobs";
import { jobsWordData } from "./JobsWordData";
import {data} from '../UserData';

function SearchResult(props) {
  const { disabled, checked } = props;
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [bubbleGraphData, setBubbleGraphData] = useState([]);
  const [barGraphData, setBarGraphData] = useState([]);
  const [wordcloudData,setWordcloudData] = useState(jobsWordData)

  const [pythonChecked, setPythonChecked] = useState(true);
  const [mysqlChecked, setMysqlChecked] = useState(true);
  const [javascriptChecked, setJavascriptChecked] = useState(true);
  const barChartRef = useRef();
  const bubbleChartRef = useRef();

  const searchHandle = async () => {
    const response = await SearchService.get(searchTitle);
    setBubbleGraphData(response.data.message);
    setBarGraphData(barChartDataMapping(response.data.message));
    bubbleChartRef.current.drawChart();
    barChartRef.current.drawChart();
  };

  const [state, setState] = React.useState({
    data:data[0],
    field:null,
    skills:false,
    name:null,
  })

  return (
    <div className="account-main">
    {/*/////////////////////////////////////////*/} 
    {/*  Search box for job title and location  */}
    {/*/////////////////////////////////////////*/} 
      <div className="ms-Grid main-id" dir="ltr">
        <div className="ms-Grid-row" 
             style={{ marginTop: "10px", 
                      marginBottom: "20px",
                      position: 'absolute', 
                      left: '30%', 
                      transform: 'translate(-10%, -0%)',
                      display:"inline-block"}}  
          >
          <div
            className="ms-Grid-col "
            style={{ display: "block", 
                     width: 300 }}
          >
            <AutocompleteJobTitle 
               onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
           <div className="ms-Grid-col " 
                style={{display:"block", 
                        marginLeft: "10px", 
                        width: 300 }}>
           <AutocompleteLocation 
              //onChange={(e) => setSearchLocation(e.target.value)} 
           />
        </div>
          <div
            className="ms-Grid-col "
            style={{ display: "block", 
                     width: 100, 
                     marginLeft: "10px" }}
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
  {/*//////////////////////////////////////////////////////*/} 
  {/*  Search result for most frequent skills - BAR CHART  */} 
  {/*//////////////////////////////////////////////////////*/} 
        <div
          className="ms-Grid-row"
          style={{ marginTop: "70px", 
                   marginLeft: "50px" }}
        >
          <div 
            className="ms-Grid-col ms-lg12" 
            style={{ display: "block" }}
          >
            <Label style={{ textAlign: "center", 
                            fontSize: 20, 
                            fontWeight: 'normal'}}>
              {barGraphData.length > 0
                ? "The most popular skills for the job title:"
                : "No matching results"}
            </Label>
            <BarChart
              style={{ fill: "#3268a8" }}
              id="barChart"
              data={barGraphData}
              ref={barChartRef}
              //onPressBar={(skill_name)=>bubbleChartRef.current.updateChart(skill_name)}
            />

            <Label></Label>
          </div>
  
  {/*/////////////////////////////////////////////////////////////////////////*/} 
  {/*  Search result for most frequent skills by location - MAP/BUBBLE CHART  */} 
  {/*/////////////////////////////////////////////////////////////////////////*/} 
          <div
            className="ms-Grid-col ms-lg12"
            style={{ display: "block", 
            marginTop: "30px" }}
          >
            <Label style={{ textAlign: "center", 
                            fontSize: 20, 
                            fontWeight: 'normal' }}>
              {barGraphData.length > 0
                ? "Locations with job offers, based on skills:"
                : "No matching results"}
            </Label>
            <BubbleChart
              ref={bubbleChartRef}
              style={{ width: "100%", float: "left" }}
              id="bubbleChart"
              data={bubbleGraphData}
            />
          </div>
        </div>
  {/*///////////////////////////////////////////////*/} 
  {/*  Most frequent skills based on user's skills  */}       
  {/*///////////////////////////////////////////////*/} 
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", 
                   marginLeft: "50px" }}
        >
           <div
            className="ms-Grid-col ms-lg12"
            style={{ display: "block", 
                     marginTop: "30px" }}
           >
               <TextField value="Frequent combination of skills needed by employers:" 
                         style={{fontWeight: 'normal', 
                                 fontSize: 20, 
                                 width: 800, 
                                 position: 'absolute', 
                                 left: '50%', 
                                 transform: 'translate(-40%, -0%)'}} 
                                 readOnly 
                                 borderless />
           </div>
        </div>
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", 
                   marginLeft: "0px" }}
        >
          {/*///////////////////////////////////////////*/} 
          {/*////////////////   Tuples  ////////////////*/} 
          {/*///////////////////////////////////////////*/} 
           <div
            className="ms-Grid-col ms-lg6"
            style={{ display: "block", 
                     textAlign: "right"}}
           >
               <TextField value="Reach.JS, PHP" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#04ba5f", textAlign: "right"}} readOnly borderless 
               />
               <TextField value="Reach.JS, MySQL" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#278a58", textAlign: "right"}} readOnly borderless 
               />
               <TextField value="MySQL, PHP" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#32664c", textAlign: "right"}} readOnly borderless 
               />
               <TextField value="MySQL, MongoDB" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#3e574b", textAlign: "right"}} readOnly borderless 
               />
               <TextField value="MongoDB, PHP" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#7e807f", textAlign: "right"}} readOnly borderless 
               />
           </div>
           {/*///////////////////////////////////////////*/} 
           {/*///////////////   Legend   ////////////////*/} 
           {/*///////////////////////////////////////////*/} 
           <div
            className="ms-Grid-col ms-lg6"
            style={{ display: "block"}}
           >
               <TextField value="■ Most frequent" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#04ba5f"}} readOnly borderless 
               />
               <TextField value="■" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#278a58"}} readOnly borderless 
               />
               <TextField value="■" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#32664c"}} readOnly borderless 
               />
               <TextField value="■" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#3e574b"}} readOnly borderless 
               />
               <TextField value="■ Least frequent" 
                style={{fontWeight: 'normal', fontSize: 16, width: 800, 
                        color: "#7e807f"}} readOnly borderless 
               />
           </div>
        </div>

  {/*////////////////////////////////////////////////////////////////////////*/} 
  {/*  Suggestions for job titles search based on user's skills - WORDCLOUD  */}  
  {/*////////////////////////////////////////////////////////////////////////*/}      
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", 
                   display: "block" }}
        >
           <div className="ms-Grid-col ms-lg12">
              <TextField value="Based on your skills you might be interested in these job titles:" 
                         style={{fontWeight: 'normal', 
                                 fontSize: 20, 
                                 width: 800, 
                                 position: 'absolute', 
                                 left: '50%', 
                                 transform: 'translate(-40%, -0%)'}} 
                         readOnly 
                         borderless />
           </div>
          
        </div>
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", 
                   marginLeft: "50px", 
                   display: "block" }}
        >
           <div
              className="ms-Grid-col ms-lg12"
              style={{ display: "block", 
                       marginTop: "10px", 
                       textAlign: "center"}}
           >
              <WordCloudJobs id="wordcloud" data={wordcloudData} />
           </div>
        </div>
        
{/*/////////////////////////////////*/} 
{/*  Save search result to MongoDB  */} 
{/*/////////////////////////////////*/} 
        <div 
          className="ms-Grid-row"
          style={{marginTop:'30px',
                  marginRight:'120px',
                  marginBottom:'100px'}} 
        >
           <div className="ms-Grid-col ms-lg12" style={{textAlign: "center"}}>
               <PrimaryButton text="Save search result" 
                              onClick={_saveAction} 
                              allowDisabledFocus 
                              disabled={disabled} 
                              checked={checked} 
                              className={[ColorClassNames.blueBackground, ColorClassNames.white].join(" ")}
           />
           </div>
        </div> 
      </div>
    </div>
  );
}

function _saveAction() {
  alert("Search has been saved");
}
function _searchAction() {
  alert("Search for skills!");
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
