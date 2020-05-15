import * as React from 'react';
import { connect } from 'react-redux';
import DashboardTable from './DashboardTable';

class Dashboard extends React.Component<{}> {
  render() {
    return <DashboardTable />;
  }
}

export default connect()(Dashboard);
