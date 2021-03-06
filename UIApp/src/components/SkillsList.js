import React, { useState, useEffect } from "react";
import SkillDataService from "../services/SkillService";
import { Link } from "react-router-dom";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveSkills();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSkills = () => {
    SkillDataService.getAll()
      .then(response => {
        setSkills(response.data.skills);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSkills();
    setCurrentSkill(null);
    setCurrentIndex(-1);
  };

  const setActiveSkill = (skill, index) => {
    setCurrentSkill(skill);
    setCurrentIndex(index);
  };

  const removeAllSkills = () => {
    SkillDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    SkillDataService.findByTitle(searchTitle)
      .then(response => {
        setSkills(response.data.skills);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Skills List</h4>

        <ul className="list-group">
          {skills && skills.length > 0 &&
            skills.map((skill, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveSkill(skill, index)}
                key={index}
              >
                {skill.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllSkills}
        >
          Remove All
        </button>
        <Link to={"/add"} className="m-3 btn btn-sm btn-primary">
              Add
            </Link>
      </div>
      <div className="col-md-6">
        {currentSkill ? (
          <div>
            <h4>Skill</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentSkill.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentSkill.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentSkill.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/skills/" + currentSkill.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Skill...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsList;
