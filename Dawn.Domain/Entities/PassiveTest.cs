namespace Dawn.Domain.Entities
{
    public class PassiveTest : ActionBase
    {
        public int ObjectiveAssessmentId { get; set; }
        public decimal Value { get; set; }

        // Navigation property
        public ObjectiveAssessment ObjectiveAssessment { get; set; }
    }
}
