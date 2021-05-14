import React, { useRef, useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Label } from "office-ui-fabric-react/lib/Label";
import BarChart from "../Charts/BarChart/BarChart";
import SearchService from "../../services/SearchService";
import Autocomplete from "../Autocomplete/Autocomplete.js";
import LocationService from "../../services/LocationService";
import BubbleChart from "../Charts/BubbleChart/BubbleChart";
import { barChartDataMapping } from "../../helper/barChartDataMapping";
import WordCloudJobs from "./WordCloudJobs";
import { TextField } from "office-ui-fabric-react/lib";
import { Button } from "@material-ui/core";
import FavoriteService from "../../services/FavoriteService";
import JobService from "../../services/JobService";
import { UserContext } from "../../UserContext";

import LinearProgress from "@material-ui/core/LinearProgress";

function SearchResult(props) {
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [jobSuggestions, setJobSuggestions] = React.useState([]);
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const [bubbleGraphData, setBubbleGraphData] = useState();
  const [barGraphData, setBarGraphData] = useState();

  const [relevantSkillSets, setRelevantSkillSets] = useState([]);

  const barChartRef = useRef();
  const bubbleChartRef = useRef();

  const searchHandle = async () => {
    setLoading(true);
    // hotSkillsbyLocation
    const hotSkillsbyLocation = await SearchService.get(
      skill?.label,
      location?.label
    );

    // relevantSkills
    const relevantSkillSets = await (
      await SearchService.getRelevantSkillSet(skill.label, user.uid)
    ).data.message;

    // console.log(hotSkillsbyLocation.data.message.slice(0, 10))
    setRelevantSkillSets(relevantSkillSets);
    setBarGraphData(
      barChartDataMapping(hotSkillsbyLocation.data.message.slice(0, 10))
    );
    setBubbleGraphData(hotSkillsbyLocation.data.message);
    setLoading(false);
    bubbleChartRef.current.drawChart();
    barChartRef.current.drawChart();
  };

  const handleSelectedLocation = (value) => {
    setLocation(value);
  };

  const getLocationSuggestions = async (value) => {
    const response = await LocationService.get(value, 10);
    const locationValues = response.data.message;
    setLocationSuggestions(locationValues);
  };

  const handleSelectedSkill = (value) => {
    setSkill(value);
  };

  const getJobSuggestions = async (value) => {
    const response = await JobService.findSuggestions(value, 10);
    const jobValues = response.data.message;
    setJobSuggestions(jobValues);
    handleSelectedSkill({ label: value, value: value }); // allow searching by partial entry into the search field
  };

  const [relevantJobTitles, setRelevantJobTitles] = useState([]);
  const { user } = useContext(UserContext);

  const getRelevantJobTitles = (userId) => {
    JobService.getRelevantJobTitles(userId)
      .then((response) => {
        let relevantTitles = response.data.message;

        const maxFrequency = Math.max(
          ...relevantTitles.map((r) => r.Frequency)
        );
        relevantTitles = relevantTitles.map((r) => ({
          JobTitle: r.JobTitle,
          Frequency: (r.Frequency * 50) / maxFrequency,
        }));

        setRelevantJobTitles(relevantTitles);
        console.log(relevantTitles);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (user) {
      getRelevantJobTitles(user.uid);
    }
  }, [user]);

  const createFavorite = () => {
    FavoriteService.create({
      name: skill?.label + ( location.label ? location.label : ''),
      jobTitle: skill,
      location: location,
      userId: user.uid
    });
    alert("You've added the search result to your favorites");
  };

  return (
    <div className="account-main">
      {/*/////////////////////////////////////////*/}
      {/*  Search box for job title and location  */}
      {/*/////////////////////////////////////////*/}
      <div className="ms-Grid main-id" dir="ltr">
        {/*////////////////////////////////////////////////////////////////////////*/}
        {/*  Suggestions for job titles search based on user's skills - WORDCLOUD  */}
        {/*////////////////////////////////////////////////////////////////////////*/}
        <div
          className="ms-Grid-row"
          style={{ marginTop: "10px", display: "block" }}
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
          style={{
            marginTop: "25px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {relevantJobTitles.length > 0 && (
            <WordCloudJobs id="wordcloud" data={relevantJobTitles} />
          )}
        </div>

        <div
          className="ms-Grid-row"
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div
            className="ms-Grid-col "
            style={{ display: "block", width: 300 }}
          >
            <Autocomplete
              label="JobTitle"
              placeholder="Software Engineer"
              options={jobSuggestions.map((job) => ({
                label: job.JobTitle,
                value: job.JobId,
              }))}
              limitTags={1}
              handleChange={getJobSuggestions}
              handleSelection={handleSelectedSkill}
            />
          </div>
          <div className="ms-Grid-col" style={{ display: "block", width: 300 }}>
            <Autocomplete
              placeholder="New York, NY"
              label="Location"
              options={locationSuggestions.map((loc) => ({
                label: `${loc.city}, ${loc.state}`,
                value: loc.locationId,
              }))}
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
              onClick={createFavorite}
              style={{
                backgroundColor: "#0078D4",
                color: "white",
              }}
            >
              Add to Favorite
            </Button>
          </div>

          <div
            style={{
              justifyContent: "center",
              width: "100%",
              position: "absolute",
              zIndex: 2000,
              marginTop: "100px",
            }}
          >
            {" "}
            {loading && <LinearProgress />}{" "}
          </div>
        </div>

        {relevantSkillSets && relevantSkillSets.length > 0 && (
          <div
            className="ms-Grid-row"
            style={{ marginTop: "50px", marginLeft: "0px" }}
          >
            {/*///////////////////////////////////////////////*/}
            {/*  Most frequent skills based on user's skills  */}
            {/*///////////////////////////////////////////////*/}

            <div className="ms-Grid-col ms-lg12" style={{ display: "block" }}>
              <Label
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "normal",
                }}
              >
                {relevantSkillSets.length > 0
                  ? "Frequent combination of skills needed by employers:"
                  : ""}
              </Label>
            </div>

            {/*///////////////////////////////////////////*/}
            {/*////////////////   Tuples  ////////////////*/}
            {/*///////////////////////////////////////////*/}
            <div
              className="ms-Grid-col ms-lg6"
              style={{
                display: "block",
                marginTop: "30px",
                textAlign: "right",
              }}
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
            <div
              className="ms-Grid-col ms-lg6"
              style={{ display: "block", marginTop: "30px" }}
            >
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

        {/*//////////////////////////////////////////////////////*/}
        {/*  Search result for most frequent skills - BAR CHART  */}
        {/*//////////////////////////////////////////////////////*/}
        <div
          className="ms-Grid-row"
          style={{ marginTop: "30px", marginLeft: "50px" }}
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
                style={{ justifyContent: "center", display: "flex" }}
                id="bubbleChart"
                data={bubbleGraphData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
