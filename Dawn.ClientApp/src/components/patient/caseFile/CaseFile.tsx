import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import * as CaseFileStore from "../../../store/CaseFile";
import { ApplicationState } from "../../../store";
import { List, message } from "antd";
import style from "./caseFile.scss";

type Props = CaseFileStore.CaseFileState &
  typeof CaseFileStore.actionCreators &
  RouteComponentProps<{ id: string }>;

class CaseFile extends React.Component<Props> {
  componentDidMount() {
    this.ensureDataFetched();
  }

  render() {
    const { file } = this.props;
    if (!file) return null;

    return (
      <>
        <div className={style.list}>
          <div className={style.header}>
            <h3>Case File: {file.name}</h3>
          </div>
          {file.consultations && (
            <List bordered>
              {file.consultations?.map((consult) => (
                <Link to="/" key={file.id}>
                  <List.Item>
                    {consult.number} {consult.date}
                  </List.Item>
                </Link>
              ))}
            </List>
          )}
        </div>
      </>
    );
  }

  private ensureDataFetched = () => {
    const { match } = this.props;
    const parsedId = parseInt(match.params.id, 10);
    if (isNaN(parsedId)) {
      message.error(`${match.params.id} is not a number`);
      return;
    }

    this.props.getCaseFile(parsedId);
  };
}

const mapStateToProps = (state: ApplicationState) => state.casefile;

export default compose(
  withRouter,
  connect(mapStateToProps, CaseFileStore.actionCreators)
)(CaseFile);
