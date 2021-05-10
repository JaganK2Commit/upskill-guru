import React, { useState, useMemo, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Stack, Link } from 'office-ui-fabric-react';
import "./App.css";

import styles from './App.style';
import LeftNav from "./components/LeftNav/LeftNav";
import Account from "./components/Account/Account";
import Favorites from "./components/Favorites/Favorites";
import SearchResult from "./components/SearchResult/SearchResult";
import Front from "./components/Front/Front";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import ManageDB from "./components/ManageDB/ManageDB";
import TopBar from './components/TopBar/TopBar';

import { UserContext } from './UserContext';
import PrivateRoute from './PrivateRoute'
function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(
        JSON.parse(localStorage.getItem('user'))
      );
    }
  }, []);
  
  return (
    <UserContext.Provider value={value}>
      <div>
        <Stack vertical className={styles.Container}>
          <Stack>
            <TopBar />
          </Stack>
          <Stack>
            <Stack horizontal>
              <Stack>
                {value.user &&                    
                <LeftNav>
                  </LeftNav>}
              </Stack>

              <Stack
                className={styles.mainContentContainer}
              >

              <div>
              <Switch>
                <Route exact path={["/"]} component={(user === null) ? Front : SearchResult} />
                <Route exact path={["/CreateAccount"]} component={CreateAccount} />
                <Route exact path={["/login"]} component={Login} />
                
                <PrivateRoute exact path={["/account"]} > <Account/> </PrivateRoute>
                <PrivateRoute exact path={["/favorites"]} > <Favorites/> </PrivateRoute>
                <PrivateRoute exact path={["/home"]} > <SearchResult/> </PrivateRoute>
                <PrivateRoute exact path={["/ManageDB"]} > <ManageDB/> </PrivateRoute>
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
