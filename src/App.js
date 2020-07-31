import React from 'react'
import Amplify from 'aws-amplify'

import awsExports from "./aws-exports";
import {
  Welcome,
  SignIn,
  Nav,
  GrantList,
  GrantWorkflow,
  CreateGrant,
} from "./pages/pages";
import {
  Switch, Route,
  BrowserRouter as Router
} from 'react-router-dom';

Amplify.configure(awsExports);

const App = () => {

  return (
    <div className="App">
      <Nav />
      <div className="container">
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
    </div>
  );
}

export default App;