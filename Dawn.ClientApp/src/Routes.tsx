import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Patient from "./components/patient/Patient";
import CaseFile from "./components/patient/caseFile/CaseFile";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/patients/:id" component={Patient as any} />
        <Route path="/patients" component={Dashboard} />
        <Route path="/casefiles/:id" component={CaseFile as any} />
      </Switch>
    );
  }
}
