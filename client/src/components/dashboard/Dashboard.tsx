import * as React from 'react';
import { connect } from 'react-redux';
import PatientsPage from '../patients/PatientsPage';

class Dashboard extends React.Component<{}> {
  render() {
    return <PatientsPage />;
  }
}

export default connect()(Dashboard);
