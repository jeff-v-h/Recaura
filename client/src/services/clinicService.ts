import { ApiService } from './apiService';
import { AxiosResponse } from 'axios';
import { Clinic, ClinicBase } from 'src/models/clinicModels';
import { keys } from '../helpers/keys';
import { message } from 'antd';

const { apiUrl } = keys;

class ClinicService extends ApiService {
  createClinic = async (clinic: ClinicBase): Promise<Clinic> => {
    try {
      const url = `${apiUrl}/clinics`;
      const resp = (await this.post(url, clinic)) as AxiosResponse<Clinic>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getClinics = async (token: string): Promise<Clinic[]> => {
    try {
      const url = `${apiUrl}/clinics?sortBy=createdAt:desc`;
      const resp = (await this.get(url, token)) as AxiosResponse<Clinic[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getClinic = async (id: string, token: string): Promise<Clinic> => {
    try {
      const url = `${apiUrl}/clinics/${id}`;
      const resp = (await this.get(url, token)) as AxiosResponse<Clinic>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  updateClinic = async (id: string, clinic: ClinicBase, token: string): Promise<Clinic> => {
    try {
      const url = `${apiUrl}/clinics/${id}`;
      const resp = (await this.patch(url, clinic, token)) as AxiosResponse<Clinic>;
      message.success('Clinic updated');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  deleteClinic = async (id: string, token: string): Promise<Clinic> => {
    try {
      const url = `${apiUrl}/clinics/${id}`;
      const resp = (await this.delete(url, token)) as AxiosResponse<Clinic>;
      message.success('Clinic deleted');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };
}

const clinicService = new ClinicService();
export default clinicService;
