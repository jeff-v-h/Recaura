import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import {
  IGetSubjectiveAssessmentVm,
  IGetObjectiveAssessmentVm,
  IGetTreatmentsVm,
  IGetPlansVm,
} from "./generated";
import { message } from "antd";

class ConsultationService {
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

  getTreatments = async (consultId: number): Promise<IGetTreatmentsVm> => {
    try {
      const url = `/api/consultations/${consultId}/treatments`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<
        IGetTreatmentsVm
      >;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getPlans = async (consultId: number): Promise<IGetPlansVm> => {
    try {
      const url = `/api/consultations/${consultId}/plans`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetPlansVm>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

export const consultationService = new ConsultationService();
