import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { Patient, PatientBase } from 'src/models/patientModels';
import { ApiService } from './apiService';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class PatientsService extends ApiService {
  createPatient = async (patient: PatientBase, token: string): Promise<Patient> => {
    try {
      const url = `${apiUrl}/patients`;
      const resp = (await this.post(url, patient, token)) as AxiosResponse<Patient>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getPatients = async (token: string): Promise<Patient[]> => {
    try {
      const url = `${apiUrl}/patients`;
      const resp = (await this.get(url, token)) as AxiosResponse<Patient[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getPatient = async (id: string, token: string): Promise<Patient> => {
    try {
      const url = `${apiUrl}/patients/${id}`;
      const resp = (await this.get(url, token)) as AxiosResponse<Patient>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  updatePatient = async (id: string, patient: PatientBase, token: string): Promise<Patient> => {
    try {
      const url = `${apiUrl}/patients/${id}`;
      const resp = (await this.patch(url, patient, token)) as AxiosResponse<Patient>;
      message.success('Patient updated');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  deletePatient = async (id: string, token: string): Promise<Patient> => {
    try {
      const url = `${apiUrl}/patients/${id}`;
      const resp = (await this.delete(url, token)) as AxiosResponse<Patient>;
      message.success('Patient deleted');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };
}

const patientsService = new PatientsService();
export default patientsService;
