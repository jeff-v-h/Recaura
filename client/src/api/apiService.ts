import { Consultation } from "../models/consultationModels";

export interface IConsultationService {
  getConsultation(id: string): Promise<Consultation>;

  updateConsultation(id: string, consult: Consultation): Promise<Consultation>;
}
