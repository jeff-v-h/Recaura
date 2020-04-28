import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import { IGetPatientsVm, IGetPatientVm, IGetCaseFileVm } from "./generated";
import { message } from "antd";

class PatientsService {
  getPatients = async (): Promise<IGetPatientsVm> => {
    try {
      const url = `/api/patients`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetPatientsVm>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getPatient = async (id: number): Promise<IGetPatientVm> => {
    try {
      const url = `/api/patients/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetPatientVm>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };

  getCaseFile = async (id: number): Promise<IGetCaseFileVm> => {
    try {
      const url = `/api/casefiles/${id}`;
      const resp = (await apiHelper.get(url)) as AxiosResponse<IGetCaseFileVm>;
      return resp.data;
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

export const patientsService = new PatientsService();
