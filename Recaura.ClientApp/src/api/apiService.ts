import { IGetConsultationVm, IUpdateConsultationCommand, IGetSubjectiveAssessmentVm, IGetObjectiveAssessmentVm } from "./generated";

export interface IConsultationService {
  getConsultation(id: number): Promise<IGetConsultationVm>;

  updateConsultation(
    id: number,
    consult: IUpdateConsultationCommand
  ): Promise<void>;

  getSubjectiveAssessment(
    consultId: number
  ): Promise<IGetSubjectiveAssessmentVm>;

  getObjectiveAssessment(
    consultId: number
  ): Promise<IGetObjectiveAssessmentVm>;
}