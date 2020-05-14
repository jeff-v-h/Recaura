import { Consultation, IUpdateConsultationCommand, SubjectiveAssessment, ObjectiveAssessment } from "../models/commonModels";

export interface IConsultationService {
  getConsultation(id: string): Promise<Consultation>;

  updateConsultation(
    id: string,
    consult: IUpdateConsultationCommand
  ): Promise<void>;

  getSubjectiveAssessment(
    consultId: string
  ): Promise<SubjectiveAssessment>;

  getObjectiveAssessment(
    consultId: string
  ): Promise<ObjectiveAssessment>;
}