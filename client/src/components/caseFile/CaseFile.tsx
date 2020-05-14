import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import * as casefileActions from "../../stores/casefiles/casefileActions";
import { CasefileState } from '../../stores/casefiles/casefileTypes';
import {  CasefilePatient } from "../../models/casefileModels";
import { ApplicationState } from "../../stores";
import { List } from "antd";
import style from "./casefile.scss";
import moment from "moment";

type Props = CasefileState &
  typeof casefileActions &
  RouteComponentProps<{ id: string }>;

class CaseFile extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched = () => {
    const { match, GetCasefile } = this.props;
    GetCasefile(match.params.id);
  };

  getFormattedDate(date: string) {
    return moment(date).format("Do MMM YYYY");
  }

  getHeader() {
    const { patient, name } = this.props
    if (!patient)
      return name;
    return this.getPatientName(patient) + ": " + name;
  }

  getPatientName(patient: CasefilePatient) {
    return `${patient.firstName} ${patient.lastName}`
  }

  render() {
    return (
      <div className={style.list}>
        <div className={style.header}>
          <h3>{this.getHeader()}</h3>
        </div>
        {this.props.consultations && (
          <List bordered>
            {this.props.consultations?.map((consult) => (
              <Link to={`/consultations/${consult.id}`} key={this.props.id}>
                <List.Item>
                  Consultation {consult.number}:{" "}
                  {this.getFormattedDate(consult.date)}
                </List.Item>
              </Link>
            ))}
          </List>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.casefile

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, casefileActions)
)(CaseFile);
