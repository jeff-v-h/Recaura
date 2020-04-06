import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/patients" component={Dashboard} />
        {/* <Route path="/fetch-data/:startDateIndex?" component={FetchData} /> */}
      </Switch>
    );
  }
}
