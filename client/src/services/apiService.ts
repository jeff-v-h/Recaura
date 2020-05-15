import { Consultation } from '../models/consultationModels';

export interface IConsultationService {
  getConsultations(casefileId: string): Promise<Consultation[]>;
  getConsultation(id: string): Promise<Consultation>;
  updateConsultation(id: string, consult: Consultation): Promise<Consultation>;
}
