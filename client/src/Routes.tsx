import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import PatientPage from './components/patient/PatientPage';
import CasefilesPage from './components/casefiles/CasefilesPage';
import ConsultationPage from './components/consultation/ConsultationPage';
import ConsultationsPage from './components/consultations/ConsultationsPage';
import PatientsPage from './components/patients/PatientsPage';
import CasefilePage from './components/casefile/CasefilePage';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/signup/SignupPage';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <PrivateRoute
          path="/patients/:patientId/casefiles/:casefileId/consultations/:consultId"
          component={ConsultationPage}
        />
        <PrivateRoute
          path="/patients/:patientId/casefiles/:casefileId/consultations"
          component={ConsultationsPage}
        />
        <PrivateRoute path="/patients/:patientId/casefiles/:casefileId" component={CasefilePage} />
        <PrivateRoute path="/patients/:patientId/casefiles" component={CasefilesPage} />
        <PrivateRoute path="/patients/:patientId" component={PatientPage} />
        <PrivateRoute exact path={['/', '/patients']} component={PatientsPage} />
      </Switch>
    );
  }
}
