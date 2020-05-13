﻿namespace Recaura.Domain.Entities
{
    public class SubjectiveAssessment
    {
        public int Id { get; set; }
        public int ConsultationId { get; set; }
        public string MOI { get; set; }
        public string CurrentHistory { get; set; }
        public string BodyChart { get; set; }
        public string AggravatingFactors { get; set; }
        public string EasingFactors { get; set; }
        public int? VAS { get; set; }
        public string PastHistory { get; set; }
        public string SocialHistory { get; set; }
        public string Imaging { get; set; }
        public string GeneralHealth { get; set; }

        // Navigation property
        public Consultation Consultation { get; set; }
    }
}
