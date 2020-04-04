using System;
using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class Consultation
    {
        public int Id { get; set; }
        public int CaseFileId { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public int PractitionerId { get; set; }
        public int SubjectiveId { get; set; }
        public int ObjectiveId { get; set; }

        // Reference and collection navigation properties
        public CaseFile CaseFile { get; set; }
        public Practitioner Practitioner { get; set; }
        public SubjectiveAssessment SubjectiveAssessment { get; set; }
        public ObjectiveAssessment ObjectiveAssessment { get; set; }
        public List<Treatment> Treatments { get; set; }
        public List<ForwardPlan> Plans { get; set; }
    }
}
