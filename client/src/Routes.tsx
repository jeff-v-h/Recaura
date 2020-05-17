import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import PatientPage from './components/patient/PatientPage';
import CasefilesPage from './components/casefiles/CasefilesPage';
import ConsultationPage from './components/consultation/ConsultationPage';
import CasefilePage from './components/file/CasefilePage';
import PatientsPage from './components/patients/PatientsPage';
import NewPatientPage from './components/patient/NewPatientPage';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={PatientsPage} />
        <Route
          path="/patients/:patientId/casefiles/:casefileId/consultations/:consultId"
          component={ConsultationPage}
        />
        <Route path="/patients/:patientId/casefiles/:casefileId" component={CasefilePage} />
        <Route path="/patients/:patientId/casefiles" component={CasefilesPage} />
        <Route exact path="/patients/new" component={NewPatientPage} />
        <Route path="/patients/:patientId" component={PatientPage} />
        <Route path="/patients" component={PatientsPage} />
      </Switch>
    );
  }
}
