import * as apiHelper from '../helpers/apiHelper';
import { AxiosResponse } from 'axios';
import { Casefile } from 'src/models/casefileModels';
import { message } from 'antd';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class CasefileService {
  getCasefile = async (id: string): Promise<Casefile> => {
    try {
      const url = `${apiUrl}/api/casefiles/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<Casefile>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
  getCasefiles = async (patientId: string): Promise<Casefile[]> => {
    try {
      const url = `${apiUrl}/api/casefiles?patientId=${patientId}&sortBy=updatedAt:desc`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<Casefile[]>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

const casefileService = new CasefileService();
export default casefileService;
