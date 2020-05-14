import * as React from "react";
import { Descriptions } from "antd";
import { Patient } from "src/models/patientModels";

const Item = Descriptions.Item;

interface Props {
  patient: Patient;
}

const PatientDescription = ({ patient }: Props) => (
  <Descriptions bordered>
    <Item label="Title">{patient.honorific}</Item>
    <Item label="First Name">{patient.firstName}</Item>
    <Item label="Last Name">{patient.lastName}</Item>
    <Item label="DOB">{patient.dob}</Item>
    <Item label="Email">{patient.email}</Item>
    <Item label="Home Ph">{patient.homePhone}</Item>
    <Item label="Mobile Ph">{patient.mobilePhone}</Item>
    <Item label="Gender">{patient.gender}</Item>
    <Item label="Occupation">{patient.occupation}</Item>
  </Descriptions>
);

export default PatientDescription;
