import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import {
  Consultation,
  SubjectiveAssessment,
  ObjectiveAssessment
} from "../models/consultationModels";
import { message } from "antd";
import { IConsultationService } from "./apiService";
import { keys } from "../helpers/keys";

const { apiUrl } = keys;

class ConsultationService implements IConsultationService {
  getConsultation = async (id: string): Promise<Consultation> => {
    try {
      const url = `${apiUrl}/api/consultations/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<Consultation>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  updateConsultation = async (
    id: string,
    consult: Consultation
  ): Promise<void> => {
    try {
      const url = `${apiUrl}/api/consultations/${id}`;
      (await apiHelper.patch(url, consult)) as AxiosResponse<void>;
      message.success("Consultation saved");
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getSubjectiveAssessment = async (consultId: string): Promise<SubjectiveAssessment> => {
    try {
      const url = `${apiUrl}/api/consultations/${consultId}/subjective`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<SubjectiveAssessment>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getObjectiveAssessment = async (consultId: string): Promise<ObjectiveAssessment> => {
    try {
      const url = `${apiUrl}/api/consultations/${consultId}/objective`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<ObjectiveAssessment>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

const consultationService = new ConsultationService();
export default consultationService