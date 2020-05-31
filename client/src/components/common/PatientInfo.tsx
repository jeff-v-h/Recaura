import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import * as patientActions from '../../stores/patients/patientActions';
import { ApplicationState } from '../../stores';
import { Descriptions } from 'antd';
import style from './patientInfo.scss';
import { parseDateString } from '../../helpers/utils';
import { EditOutlined } from '@ant-design/icons';

const Item = Descriptions.Item;

const mapStateToProps = (state: ApplicationState) => state.patient;
const connector = connect(mapStateToProps, patientActions);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ patientId: string; casefileId: string }>;

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
    const { patientId, casefileId } = match.params;
    const patientUrl = `/patients/${patientId}`;

    return (
      <div className={style.description}>
        <Descriptions bordered size="middle">
          <Item label="First Name">
            <Link to={`${patientUrl}/casefiles`}>
              <div>{firstName}</div>
            </Link>
          </Item>
          <Item label="Last Name">
            <Link to={`${patientUrl}/casefiles`}>
              <div>{lastName}</div>
            </Link>
          </Item>
          <Item label="DOB">{parseDateString(dob)}</Item>
          <Item label="Gender">{gender}</Item>
          <Item label="Occupation">{occupation}</Item>
        </Descriptions>
        <Link to={patientUrl} className={casefileId ? style.editLinkInvis : style.editLink}>
          <EditOutlined />
        </Link>
      </div>
    );
  }
}

export default compose<React.ComponentType>(withRouter, connector)(PatientInfo);
