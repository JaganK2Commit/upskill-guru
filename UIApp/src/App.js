import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Stack } from 'office-ui-fabric-react';
import "./App.css";

import styles from './App.style';
import AddSkill from "./components/AddSkill";
import Skill from "./components/Skill";
import SkillsList from "./components/SkillsList";
import LeftNav from "./components/LeftNav/LeftNav";
import Account from "./components/Account/Account";

function App() {
  return (
    <div>
      <Stack vertical className={styles.Container}>
        <Stack>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            UpSkill-Guru
          </a>
        </nav>
        </Stack>
        <Stack>
          <Stack horizontal>
            <Stack>
                <LeftNav>
                </LeftNav>
            </Stack>

            <Stack
              className={styles.mainContentContainer}
            >

            <div>
            <Switch>
              <Route exact path={["/", "/skills"]} component={SkillsList} />
              <Route exact path="/Account" component={Account} />
              <Route exact path="/add" component={AddSkill} />
              <Route path="/skills/:id" component={Skill} />
            </Switch>
            </div>
            </Stack>
            </Stack>
          </Stack>
      </Stack>

      
    </div>
  );
}

export default App;
