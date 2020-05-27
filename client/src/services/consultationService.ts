import { AxiosResponse } from 'axios';
import { Consultation, ConsultationBase } from '../models/consultationModels';
import { message } from 'antd';
import { ApiService } from './apiService';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class ConsultationService extends ApiService {
  async createConsultation(consult: ConsultationBase, token: string): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations`;
      const resp = (await this.post(url, consult, token)) as AxiosResponse<Consultation>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async getConsultations(token: string, casefileId?: string): Promise<Consultation[]> {
    try {
      let url = `${apiUrl}/consultations?sortBy=date:desc`;
      if (casefileId) url += `&casefileId=${casefileId}`;
      const resp = (await this.get(url, token)) as AxiosResponse<Consultation[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async getConsultation(id: string, token: string): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.get(url, token)) as AxiosResponse<Consultation>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async updateConsultation(
    id: string,
    consult: ConsultationBase,
    token: string
  ): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.patch(url, consult, token)) as AxiosResponse<Consultation>;
      message.success('Consultation updated');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async deleteConsultation(id: string, token: string): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.delete(url, token)) as AxiosResponse<Consultation>;
      message.success('Consultation deleted');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }
}

const consultationService = new ConsultationService();
export default consultationService;
