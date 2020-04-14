using Dawn.Application.Common.Mappings;
using Dawn.Application.Common.Models;
using Dawn.Domain.Entities;
using System;

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
        public string Treatments { get; set; }
        public string Plans { get; set; }
    }
}
