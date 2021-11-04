// Packages
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Page Component
import HomePage from "./pages/HomePage";
import MessagePage from "./pages/MessagePage";
import ErrorPage from "./pages/ErrorPage";
import MessageLogPage from "./pages/MessageLogPage";
import MessageSelectionPage from "./pages/MessageSelectionPage"

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/message/selection" component={MessageSelectionPage} />
          <Route exact path="/message/logs" component={MessageLogPage} />
          <Route exact path="/message" component={MessagePage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
