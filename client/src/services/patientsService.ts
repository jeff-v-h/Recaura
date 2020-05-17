import { ApiService } from './apiService';
import { AxiosResponse } from 'axios';
import { Patient } from 'src/models/patientModels';
import { message } from 'antd';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class PatientsService extends ApiService {
  getPatients = async (): Promise<Patient[]> => {
    try {
      const url = `${apiUrl}/patients`;
      const resp = (await this.get(url)) as AxiosResponse<Patient[]>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getPatient = async (id: string): Promise<Patient> => {
    try {
      const url = `${apiUrl}/patients/${id}`;
      const resp = (await this.get(url)) as AxiosResponse<Patient>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

const patientsService = new PatientsService();
export default patientsService;
