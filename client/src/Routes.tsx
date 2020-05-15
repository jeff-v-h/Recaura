import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Patient from './components/patient/Patient';
import CasefilesPage from './components/casefiles/CasefilesPage';
import Casefile from './components/casefile/Casefile';
import Consultation from './components/consultation/Consultation';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/patients/:patientId/casefiles/:casefileId" component={Casefile} />
        <Route path="/patients/:patientId/casefiles" component={CasefilesPage} />
        <Route path="/patients/:patientId" component={Patient} />
        <Route path="/patients" component={Dashboard} />
        <Route path="/consultations/:consultId" component={Consultation as any} />
      </Switch>
    );
  }
}
