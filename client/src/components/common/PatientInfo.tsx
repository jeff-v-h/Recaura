import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as patientActions from "../../stores/patients/patientActions";
import { PatientState } from "../../stores/patients/patientTypes";
import { ApplicationState } from "../../stores";
import { Descriptions } from "antd";

const Item = Descriptions.Item;

type Props = PatientState &
    typeof patientActions &
    RouteComponentProps<{ id: string }>;

class PatientInfo extends React.Component<Props> {
    componentDidMount() {
        this.ensureDataFetched();
    }

    ensureDataFetched = () => {
        const { match, getPatient } = this.props;
        getPatient(match.params.id);
    };

    render() {
        const { firstName, lastName, dob, gender, occupation } = this.props

        return (
            <>
                <Descriptions bordered>
                    <Item label="First Name">{firstName}</Item>
                    <Item label="Last Name">{lastName}</Item>
                    <Item label="DOB">{dob}</Item>
                    <Item label="Gender">{gender}</Item>
                    <Item label="Occupation">{occupation}</Item>
                </Descriptions>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => state.patient;

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, patientActions)
)(PatientInfo);
