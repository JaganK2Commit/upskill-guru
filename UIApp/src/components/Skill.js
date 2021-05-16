import React, { useState, useEffect } from "react";
import SkillDataService from "../services/SkillService";

const Skill = (props) => {
  const initialSkillState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentSkill, setCurrentSkill] = useState(initialSkillState);
  const [message, setMessage] = useState("");

  const getSkill = (id) => {
    SkillDataService.get(id)
      .then((response) => {
        setCurrentSkill(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSkill(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSkill({ ...currentSkill, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentSkill.id,
      title: currentSkill.title,
      description: currentSkill.description,
      published: status,
    };

    SkillDataService.update(currentSkill.id, data)
      .then((response) => {
        setCurrentSkill({ ...currentSkill, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateSkill = () => {
    SkillDataService.update(currentSkill.id, currentSkill)
      .then((response) => {
        console.log(response.data);
        setMessage("The skill was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSkill = () => {
    SkillDataService.remove(currentSkill.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/skills");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSkill ? (
        <div className="edit-form">
          <h4>Skill</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentSkill.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentSkill.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentSkill.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentSkill.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteSkill}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSkill}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Skill...</p>
        </div>
      )}
    </div>
  );
};

export default Skill;
