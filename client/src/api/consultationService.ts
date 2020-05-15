import * as apiHelper from "../helpers/apiHelper";
import { AxiosResponse } from "axios";
import { Consultation } from "../models/consultationModels";
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
  ): Promise<Consultation> => {
    try {
      const url = `${apiUrl}/api/consultations/${id}`;
      const resp = (await apiHelper.patch(url, consult)) as AxiosResponse<Consultation>;
      message.success("Consultation saved");
      return resp.data
    } catch (e) {
      message.error(e);
      return Promise.reject(e);
    }
  };
}

const consultationService = new ConsultationService();
export default consultationService