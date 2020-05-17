import { AxiosResponse } from 'axios';
import { Consultation } from '../models/consultationModels';
import { message } from 'antd';
import { ApiService } from './apiService';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class ConsultationService extends ApiService {
  async getConsultations(casefileId: string): Promise<Consultation[]> {
    try {
      const url = `${apiUrl}/consultations?casefileId=${casefileId}`;
      const resp = (await this.get(url)) as AxiosResponse<Consultation[]>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  }

  async getConsultation(id: string): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.get(url)) as AxiosResponse<Consultation>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  }

  async updateConsultation(id: string, consult: Consultation): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.patch(url, consult)) as AxiosResponse<Consultation>;
      message.success('Consultation saved');
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  }
}

const consultationService = new ConsultationService();
export default consultationService;
