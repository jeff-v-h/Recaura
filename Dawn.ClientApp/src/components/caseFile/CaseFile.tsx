import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import * as CaseFileStore from "../../store/CaseFile";
import { ApplicationState } from "../../store";
import { List, message } from "antd";
import style from "./caseFile.scss";
import moment from "moment";
import {
  IGetCaseFileVm,
  IFilesPatientVm,
  Honorific,
} from "../../api/generated";

type Props = CaseFileStore.CaseFileState &
  typeof CaseFileStore.actionCreators &
  RouteComponentProps<{ id: string }>;

class CaseFile extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  getFormattedDate(date: string) {
    return moment(date).format("Do MMM YYYY");
  }

  getHeader(file: IGetCaseFileVm) {
    if (!file?.patient) return file.name;

    return this.getPatientName(file.patient) + ": " + file.name;
  }

  getPatientName(patient: IFilesPatientVm) {
    return (
      `${Honorific[patient.honorific]} ` +
      `${patient.firstName} ${patient.lastName}`
    );
  }

  render() {
    const { file } = this.props;
    if (!file) return null;

    return (
      <div className={style.list}>
        <div className={style.header}>
          <h3>{this.getHeader(file)}</h3>
        </div>
        {file.consultations && (
          <List bordered>
            {file.consultations?.map((consult) => (
              <Link to={`/consultations/${consult.id}`} key={file.id}>
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

  private ensureDataFetched = () => {
    const { match, getCaseFile } = this.props;
    const parsedId = parseInt(match.params.id, 10);
    if (isNaN(parsedId)) {
      message.error(`${match.params.id} is not a number`);
      return;
    }

    getCaseFile(parsedId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.casefile;

export default compose(
  withRouter,
  connect(mapStateToProps, CaseFileStore.actionCreators)
)(CaseFile);
