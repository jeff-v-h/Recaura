using Dawn.Application.Common.Mappings;
using Dawn.Application.Features.Consultations.Queries.Common;
using Dawn.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class GetConsultationVm : IMapFrom<Consultation>
    {
        public int Id { get; set; }
        public int CaseFileId { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public PractitionerVm Practitioner { get; set; }
        public SubjectiveAssessmentVm SubjectiveAssessment { get; set; }
        public ObjectiveAssessmentVm ObjectiveAssessment { get; set; }
        public List<TreatmentVm> Treatments { get; set; }
        public List<ForwardPlanVm> Plans { get; set; }
    }
}
