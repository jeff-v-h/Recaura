import { AxiosResponse } from 'axios';
import { Consultation, ConsultationBase } from '../models/consultationModels';
import { message } from 'antd';
import { ApiService } from './apiService';
import { keys } from '../helpers/keys';

const { apiUrl } = keys;

class ConsultationService extends ApiService {
  async createConsultation(consult: ConsultationBase): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations`;
      const resp = (await this.post(url, consult)) as AxiosResponse<Consultation>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async getConsultations(casefileId?: string): Promise<Consultation[]> {
    try {
      let url = `${apiUrl}/consultations`;
      if (casefileId) url += `?casefileId=${casefileId}`;
      const resp = (await this.get(url)) as AxiosResponse<Consultation[]>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async getConsultation(id: string): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.get(url)) as AxiosResponse<Consultation>;
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async updateConsultation(id: string, consult: Consultation): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.patch(url, consult)) as AxiosResponse<Consultation>;
      message.success('Consultation updated');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }

  async deleteConsultation(id: string): Promise<Consultation> {
    try {
      const url = `${apiUrl}/consultations/${id}`;
      const resp = (await this.delete(url)) as AxiosResponse<Consultation>;
      message.success('Consultation deleted');
      return resp.data;
    } catch (e) {
      return this.handleRequestError(e);
    }
  }
}

const consultationService = new ConsultationService();
export default consultationService;
