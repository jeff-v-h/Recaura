using System;

namespace Dawn.Domain.Entities
{
    public class Consultation
    {
        public int Id { get; set; }
        public int InjuryFileId { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public Physiotherapist Physio { get; set; }
        public SubjectiveAssessment Subjective { get; set; }
        public ObjectiveAssessment Objective { get; set; }
        public Treatment Treatment { get; set; }
        public string Plan { get; set; }
    }
}
