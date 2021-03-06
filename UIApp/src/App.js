import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSkill from "./components/AddSkill";
import Skill from "./components/Skill";
import SkillsList from "./components/SkillsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/skills" className="navbar-brand">
          UpSkill-Guru
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/skills"} className="nav-link">
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/skills"]} component={SkillsList} />
          <Route exact path="/add" component={AddSkill} />
          <Route path="/skills/:id" component={Skill} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
