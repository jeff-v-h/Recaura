using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class SubjectiveAssessment
    {
        public string MOI { get; set; }
        public string CurrentHistory { get; set; }
        public string BodyChart { get; set; }
        public List<string> AggravatingFactors { get; set; }
        public List<string> EasingFactors { get; set; }
        public int VAS { get; set; }
        public string PastHistory { get; set; }
        public string SocialHistory { get; set; }
        public string Imaging { get; set; }
        public string GeneralHealth { get; set; }
    }
}
