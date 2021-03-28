import React, { useState, useMemo, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Stack, Link } from 'office-ui-fabric-react';
import "./App.css";

import styles from './App.style';
import AddSkill from "./components/AddSkill";
import Skill from "./components/Skill";
import SkillsList from "./components/SkillsList";
import LeftNav from "./components/LeftNav/LeftNav";
import Account from "./components/Account/Account";
import SavedSearch from "./components/SavedSearch/SavedSearch";
import SearchResult from "./components/SearchResult/SearchResult";
import Front from "./components/Front/Front";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import ManageDB from "./components/ManageDB/ManageDB";

import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    setUser(localStorage.getItem('token'));
  });
  // initializeIcons();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setUser(null);
  }
  
  return (
    <UserContext.Provider value={value}>
      <div>
        <Stack vertical className={styles.Container}>
          <Stack>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                UpSkill-Guru
              </a>
              <div align='end'>
              { !user 
                ? <Link href="/login">login</Link>
                : <Link href="#" onClick={() => logout()}>logout</Link>
              }
              </div>
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
                <Route exact path={["/Account"]} component={Account} />
                <Route exact path={["/SavedSearch"]} component={SavedSearch} />
                <Route exact path={["/CreateAccount"]} component={CreateAccount} />
                <Route exact path={["/Login"]} component={Login} />
                <Route exact path={["/SearchResult"]} component={SearchResult} />
                <Route exact path={["/Front"]} component={Front} />
                <Route exact path={["/ManageDB"]} component={ManageDB} />
                <Route exact path="/add" component={AddSkill} />
                <Route path="/skills/:id" component={Skill} />
                {/* <Route path="/login" component={Login} /> */}
              </Switch>
              </div>
              </Stack>
              </Stack>
            </Stack>
        </Stack>       
      </div>
    </UserContext.Provider>
  );
}

export default App;
