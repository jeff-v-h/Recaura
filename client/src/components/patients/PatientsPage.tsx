import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { Button } from 'antd';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import PatientsTable from './PatientsTable';
import { RowData } from './patientRowData';
import style from './patients.scss';

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{}>;

class PatientsPage extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => this.props.getPatients();

  onRow = (patientRow: RowData) => {
    return {
      onClick: (event: React.MouseEvent) => {
        const { history } = this.props;
        history.push(`/patients/${patientRow.key}/casefiles`);
      }
    };
  };

  render() {
    const { list } = this.props;
    return (
      <>
        <div className={style.newButton}>
          <Button type="primary">
            <Link to="/patients/new">New Patient</Link>
          </Button>
        </div>
        <PatientsTable onRowClick={this.onRow} patients={list} />
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(PatientsPage);
