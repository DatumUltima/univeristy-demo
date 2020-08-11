import React, { useEffect, useState, useReducer } from "react";
import Amplify from "aws-amplify";

import awsExports from "./aws-exports";

//Pages
import Nav from "./pages/Navigation";
import Welcome from "./pages/Welcome";
import GrantList from "./pages/GrantList";
import CreateGrant from "./pages/CreateGrant";
import GrantWorkflow from "./pages/GrantWorkflow";
import SignIn, { isAuthenticated } from "./pages/Authentication";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

Amplify.configure(awsExports);

const App = () => {

  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
      isAuthenticated().then((res) => {
        if (res) {
          dispatch({ type: "LOGIN", payload: {} });
        }
      });
  },[]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Nav />
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/grants" component={GrantList} />
            <Route path="/grants/new" component={CreateGrant} />
            <Route path="/grants/:grantId" component={GrantWorkflow} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
