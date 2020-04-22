using Recaura.Application.Common.Models;
using System;

namespace Recaura.Application.Features.Consultations.GetConsultation
{
    public class GetConsultationVm
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
