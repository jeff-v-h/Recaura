import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import {
  IGetConsultationVm,
  IGetSubjectiveAssessmentVm,
  IGetObjectiveAssessmentVm,
  IUpdateConsultationCommand,
} from "./generated";
import { message } from "antd";
import { IConsultationService } from "./apiService";
import { keys } from "../helpers/keys";

const { apiUrl } = keys;

class ConsultationService implements IConsultationService {
  getConsultation = async (id: number): Promise<IGetConsultationVm> => {
    try {
      const url = `${apiUrl}/api/consultations/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<
        IGetConsultationVm
      >;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  updateConsultation = async (
    id: number,
    consult: IUpdateConsultationCommand
  ): Promise<void> => {
    try {
      const url = `${apiUrl}/api/consultations/${id}`;
      (await apiHelper.put(url, consult)) as AxiosResponse<void>;
      message.success("Consultation saved");
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getSubjectiveAssessment = async (
    consultId: number
  ): Promise<IGetSubjectiveAssessmentVm> => {
    try {
      const url = `${apiUrl}/api/consultations/${consultId}/subjective`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<
        IGetSubjectiveAssessmentVm
      >;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getObjectiveAssessment = async (
    consultId: number
  ): Promise<IGetObjectiveAssessmentVm> => {
    try {
      const url = `${apiUrl}/api/consultations/${consultId}/objective`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<
        IGetObjectiveAssessmentVm
      >;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

export const consultationService = new ConsultationService();
