import { ApiService } from './apiService';
import { AxiosResponse } from 'axios';
import { Practitioner, PractitionerBase, LoginResponse } from '../models/practitionerModels';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class PractitionerService extends ApiService {
  login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const url = `${apiUrl}/practitioners/login`;
      const resp = (await this.post(url, { email, password })) as AxiosResponse<LoginResponse>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  logout = async (token: string): Promise<void> => {
    try {
      const url = `${apiUrl}/practitioners/logout`;
      await this.post(url, null, token);
      return;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  createPractitioner = async (user: PractitionerBase): Promise<LoginResponse> => {
    try {
      const url = `${apiUrl}/practitioners`;
      const resp = (await this.post(url, user, undefined, false)) as AxiosResponse<LoginResponse>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getPractitioners = async (token: string): Promise<Practitioner[]> => {
    try {
      const url = `${apiUrl}/practitioners`;
      const resp = (await this.get(url, token)) as AxiosResponse<Practitioner[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getPractitioner = async (id: string, token: string): Promise<Practitioner> => {
    try {
      const url = `${apiUrl}/practitioners/${id}`;
      const resp = (await this.get(url, token)) as AxiosResponse<Practitioner>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  updatePractitioner = async (
    id: string,
    data: PractitionerBase,
    token: string
  ): Promise<Practitioner> => {
    try {
      const url = `${apiUrl}/practitioners/${id}`;
      const resp = (await this.patch(url, data, token)) as AxiosResponse<Practitioner>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  deletePractitioner = async (id: string, token: string): Promise<Practitioner> => {
    try {
      const url = `${apiUrl}/practitioners/${id}`;
      const resp = (await this.delete(url, token)) as AxiosResponse<Practitioner>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };
}

const practitionerService = new PractitionerService();
export default practitionerService;
