import React from 'react'
import Amplify from 'aws-amplify'

import awsExports from "./aws-exports";
import {Welcome,ToDoItems,SignIn,Nav} from './pages/pages';
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
            <Route path="/todo" component={ToDoItems} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;