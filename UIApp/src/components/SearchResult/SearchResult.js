import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Label } from "office-ui-fabric-react/lib/Label";
import BarChart from "../Charts/BarChart/BarChart";
import SearchService from "../../services/SearchService";
import Autocomplete from "../Autocomplete/Autocomplete.js";
import LocationService from "../../services/LocationService";
import SkillService from "../../services/SkillService";
import BubbleChart from "../Charts/BubbleChart/BubbleChart";
import { barChartDataMapping } from "../../helper/barChartDataMapping";
import WordCloudJobs from "./WordCloudJobs";
import { jobsWordData } from "./JobsWordData";
import { TextField } from "office-ui-fabric-react/lib";
import { Button } from "@material-ui/core";

function SearchResult(props) {
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [skillSuggestions, setSkillSuggestions] = React.useState([]);
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [searchTitle, setSearchTitle] = useState("");

  const [bubbleGraphData, setBubbleGraphData] = useState();
  const [barGraphData, setBarGraphData] = useState();
  const [wordcloudData, setWordcloudData] = useState(jobsWordData);

  const [relevantSkillSets, setRelevantSkillSets] = useState([]);

  const barChartRef = useRef();
  const bubbleChartRef = useRef();

  const searchHandle = async () => {
    // hotSkillsbyLocation
    const hotSkillsbyLocation = await SearchService.get(skill, location);
    // console.log(hotSkillsbyLocation.data.message)
    
    // relevantSkills
    const relevantSkillSets = await (
      await SearchService.getRelevantSkillSet(searchTitle)
    ).data.message;

    setRelevantSkillSets(relevantSkillSets);
    setBubbleGraphData(hotSkillsbyLocation.data.message);
    setBarGraphData(barChartDataMapping(hotSkillsbyLocation.data.message));
    bubbleChartRef.current.drawChart();
    barChartRef.current.drawChart();
  };

  const handleSelectedLocation = (value) => {
    setLocation(value.label);
  };

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  };

  const handleSelectedSkill = (value) => {
    setSkill(value.label);
  }

  const getSkillSuggestions = async (value) => {
    const response = await SkillService.findSuggestions(value, 10);
    const skillValues = response.data.message;
    setSkillSuggestions(skillValues);
  }

  return (
    <div className="account-main">
      {/*/////////////////////////////////////////*/}
      {/*  Search box for job title and location  */}
      {/*/////////////////////////////////////////*/}
      <div className="ms-Grid main-id" dir="ltr">
        <div
          className="ms-Grid-row"
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            position: "absolute",
            left: "30%",
            transform: "translate(-10%, -0%)",
            display: "inline-block",
          }}
        >
          <div
            className="ms-Grid-col "
            style={{ display: "block", width: 300 }}
          >
            {/* <AutocompleteJobTitle 
               onChange={(e) => setSearchTitle(e.target.value)}
            /> */}
            <Autocomplete 
              label="JobTitle"
              placeholder="Software Engineer"
              options={ skillSuggestions.map((skill) => ({label: `${skill.skillName}`, value: `${skill.skillId}`})) }
              limitTags={1}
              handleChange={getSkillSuggestions}
              handleSelection={handleSelectedSkill} />
          </div>
          <div className="ms-Grid-col" style={{ display: "block", width: 200 }}>
            <Autocomplete
              placeholder="New York, NY"
              label="Location"
              options={locationSuggestions.map(
                (loc) => ({label: `${loc.city}, ${loc.state}`, value: loc.locationId})
              )}
              limitTags={1}
              handleChange={getLocationSuggestions}
              handleSelection={handleSelectedLocation}
            />
          </div>
          <div className="ms-Grid-col" style={{ display: "block" }}>
            <Button
              variant="contained"
              onClick={searchHandle}
              style={{
                backgroundColor: "#0078D4",
                color: "white",
              }}
            >
              Search
            </Button>
          </div>
          <div className="ms-Grid-col" style={{ display: "block" }}>
            <Button
              variant="contained"
              onClick={_saveAction}
              style={{
                backgroundColor: "#0078D4",
                color: "white",
              }}
            >
              Add to Favorite
            </Button>
          </div>
        </div>
        {/*//////////////////////////////////////////////////////*/}
        {/*  Search result for most frequent skills - BAR CHART  */}
        {/*//////////////////////////////////////////////////////*/}
        <div
          className="ms-Grid-row"
          style={{ marginTop: "70px", marginLeft: "50px" }}
        >
          {barGraphData && (
            <div className="ms-Grid-col ms-lg12" style={{ display: "block" }}>
              <Label
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "normal",
                }}
              >
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
          )}

          {/*/////////////////////////////////////////////////////////////////////////*/}
          {/*  Search result for most frequent skills by location - MAP/BUBBLE CHART  */}
          {/*/////////////////////////////////////////////////////////////////////////*/}
          {barGraphData && (
            <div
              className="ms-Grid-col ms-lg12"
              style={{ display: "block", marginTop: "30px" }}
            >
              <Label
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "normal",
                }}
              >
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
          )}
        </div>

        {relevantSkillSets && relevantSkillSets.length > 0 && (
          <div
            className="ms-Grid-row"
            style={{ marginTop: "30px", marginLeft: "0px" }}
          >
            {/*///////////////////////////////////////////////*/}
            {/*  Most frequent skills based on user's skills  */}
            {/*///////////////////////////////////////////////*/}

            <div
              className="ms-Grid-col ms-lg12"
              style={{ display: "block", marginTop: "30px" }}
            >
              <TextField
                value="Frequent combination of skills needed by employers:"
                style={{
                  fontWeight: "normal",
                  fontSize: 20,
                  width: 800,
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-40%, -0%)",
                }}
                readOnly
                borderless
              />
            </div>

            {/*///////////////////////////////////////////*/}
            {/*////////////////   Tuples  ////////////////*/}
            {/*///////////////////////////////////////////*/}
            <div
              className="ms-Grid-col ms-lg6"
              style={{ display: "block", textAlign: "right" }}
            >
              <TextField
                value={relevantSkillSets[0].skillSet}
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                  width: 800,
                  color: "#04ba5f",
                  textAlign: "right",
                }}
                readOnly
                borderless
              />
              {relevantSkillSets[1] && (
                <TextField
                  value={relevantSkillSets[1].skillSet}
                  style={{
                    fontWeight: "normal",
                    fontSize: 16,
                    width: 800,
                    color: "#278a58",
                    textAlign: "right",
                  }}
                  readOnly
                  borderless
                />
              )}
              {relevantSkillSets[2] && (
                <TextField
                  value={relevantSkillSets[2].skillSet}
                  style={{
                    fontWeight: "normal",
                    fontSize: 16,
                    width: 800,
                    color: "#32664c",
                    textAlign: "right",
                  }}
                  readOnly
                  borderless
                />
              )}
              {relevantSkillSets[3] && (
                <TextField
                  value={relevantSkillSets[3].skillSet}
                  style={{
                    fontWeight: "normal",
                    fontSize: 16,
                    width: 800,
                    color: "#3e574b",
                    textAlign: "right",
                  }}
                  readOnly
                  borderless
                />
              )}

              {relevantSkillSets[4] && (
                <TextField
                  value={relevantSkillSets[4].skillSet}
                  style={{
                    fontWeight: "normal",
                    fontSize: 16,
                    width: 800,
                    color: "#7e807f",
                    textAlign: "right",
                  }}
                  readOnly
                  borderless
                />
              )}
            </div>
            {/*///////////////////////////////////////////*/}
            {/*///////////////   Legend   ////////////////*/}
            {/*///////////////////////////////////////////*/}
            <div className="ms-Grid-col ms-lg6" style={{ display: "block" }}>
              <TextField
                value="■ Most frequent"
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                  width: 800,
                  color: "#04ba5f",
                }}
                readOnly
                borderless
              />
              <TextField
                value="■"
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                  width: 800,
                  color: "#278a58",
                }}
                readOnly
                borderless
              />
              <TextField
                value="■"
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                  width: 800,
                  color: "#32664c",
                }}
                readOnly
                borderless
              />
              <TextField
                value="■"
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                  width: 800,
                  color: "#3e574b",
                }}
                readOnly
                borderless
              />
              <TextField
                value="■ Least frequent"
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                  width: 800,
                  color: "#7e807f",
                }}
                readOnly
                borderless
              />
            </div>
          </div>
        )}

        {/*////////////////////////////////////////////////////////////////////////*/}
        {/*  Suggestions for job titles search based on user's skills - WORDCLOUD  */}
        {/*////////////////////////////////////////////////////////////////////////*/}
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", display: "block" }}
        >
          <div className="ms-Grid-col ms-lg12">
            <TextField
              value="Based on your skills you might be interested in these job titles:"
              style={{
                fontWeight: "normal",
                fontSize: 20,
                width: 800,
                position: "absolute",
                left: "50%",
                transform: "translate(-40%, -0%)",
              }}
              readOnly
              borderless
            />
          </div>
        </div>
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", marginLeft: "50px", display: "block" }}
        >
          <div
            className="ms-Grid-col ms-lg12"
            style={{ display: "block", marginTop: "10px", textAlign: "center" }}
          >
            <WordCloudJobs id="wordcloud" data={wordcloudData} />
          </div>
        </div>

        {/*/////////////////////////////////*/}
        {/*  Save search result to MongoDB  */}
        {/*/////////////////////////////////*/}
        <div
          className="ms-Grid-row"
          style={{
            marginTop: "30px",
            marginRight: "120px",
            marginBottom: "100px",
          }}
        ></div>
      </div>
    </div>
  );
}

const _saveAction = () => {
  // FavoriteService.create({
  //   jobTitle: searchTitle,
  //   location: Location
  // })
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
};


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
