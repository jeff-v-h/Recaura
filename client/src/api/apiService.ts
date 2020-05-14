import { IGetConsultationVm, IUpdateConsultationCommand, IGetSubjectiveAssessmentVm, IGetObjectiveAssessmentVm } from "../models/commonModels";

export interface IConsultationService {
  getConsultation(id: string): Promise<IGetConsultationVm>;

  updateConsultation(
    id: string,
    consult: IUpdateConsultationCommand
  ): Promise<void>;

  getSubjectiveAssessment(
    consultId: string
  ): Promise<IGetSubjectiveAssessmentVm>;

  getObjectiveAssessment(
    consultId: string
  ): Promise<IGetObjectiveAssessmentVm>;
}