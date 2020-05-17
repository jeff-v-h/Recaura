import { ApiService } from './apiService';
import { AxiosResponse } from 'axios';
import { Casefile } from 'src/models/casefileModels';
import { message } from 'antd';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class CasefileService extends ApiService {
  getCasefile = async (id: string): Promise<Casefile> => {
    try {
      const url = `${apiUrl}/casefiles/${id}`;
      const resp = (await this.get(url)) as AxiosResponse<Casefile>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };

  getCasefiles = async (patientId: string): Promise<Casefile[]> => {
    try {
      const url = `${apiUrl}/casefiles?patientId=${patientId}&sortBy=updatedAt:desc`;
      const resp = (await this.get(url)) as AxiosResponse<Casefile[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  };
}

const casefileService = new CasefileService();
export default casefileService;
