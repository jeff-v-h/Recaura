import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
      </Switch>
    );
  }
}
