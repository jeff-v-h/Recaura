import * as React from 'react';
import { connect } from 'react-redux';
import Patients from './Patients';

class Dashboard extends React.Component<{}> {
  render() {
    return <Patients />;
  }
}

export default connect()(Dashboard);
