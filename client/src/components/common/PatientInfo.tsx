import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import { Descriptions } from 'antd';
import style from './patientInfo.scss';

const Item = Descriptions.Item;

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{ patientId: string }>;

class PatientInfo extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  ensureDataFetched = () => {
    const { id, match, getPatient, list, selectPatient } = this.props;
    const { patientId } = match.params;

    if (!id || id !== patientId) {
      const patient = list.find((p) => p.id === patientId);

      if (patient) return selectPatient(patient);
      getPatient(patientId);
    }
  };

  render() {
    const { firstName, lastName, dob, gender, occupation, match } = this.props;

    return (
      <>
        <Descriptions bordered className={style.description}>
          <Item label="First Name">
            <Link to={`/patients/${match.params.patientId}`}>{firstName}</Link>
          </Item>
          <Item label="Last Name">
            <Link to={`/patients/${match.params.patientId}`}>{lastName}</Link>
          </Item>
          <Item label="DOB">{dob}</Item>
          <Item label="Gender">{gender}</Item>
          <Item label="Occupation">{occupation}</Item>
        </Descriptions>
      </>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(PatientInfo);
