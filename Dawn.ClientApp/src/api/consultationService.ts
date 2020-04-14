import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import {
  IGetConsultationVm,
  IGetSubjectiveAssessmentVm,
  IGetObjectiveAssessmentVm,
} from "./generated";
import { message } from "antd";

class ConsultationService {
  getConsultation = async (id: number): Promise<IGetConsultationVm> => {
    try {
      const url = `/api/consultations/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<
        IGetConsultationVm
      >;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getSubjectiveAssessment = async (
    consultId: number
  ): Promise<IGetSubjectiveAssessmentVm> => {
    try {
      const url = `/api/consultations/${consultId}/subjective`;
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
      const url = `/api/consultations/${consultId}/objective`;
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
