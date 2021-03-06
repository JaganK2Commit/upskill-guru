import React, { useState } from "react";
import SkillDataService from "../services/SkillService";

const AddSkill = () => {
  const initialSkillState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [skill, setSkill] = useState(initialSkillState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSkill({ ...skill, [name]: value });
  };

  const saveSkill = () => {
    var data = {
      title: skill.title,
      description: skill.description
    };

    SkillDataService.create(data)
      .then(response => {
        setSkill({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newSkill = () => {
    setSkill(initialSkillState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSkill}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={skill.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={skill.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveSkill} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSkill;
