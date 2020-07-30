import React from 'react'
import Amplify from 'aws-amplify'

import awsExports from "./aws-exports";
import Welcome from './pages/Welcome';
import ToDoItems from './pages/ToDoItems';
import SignIn from './pages/Authentication';
import {
  Switch, Route,
  BrowserRouter as Router
} from 'react-router-dom';

Amplify.configure(awsExports);

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/todo" component={ToDoItems} />
        <Route path="/login" component={SignIn} />
      </Switch>
    </Router>
  )
}

export default App