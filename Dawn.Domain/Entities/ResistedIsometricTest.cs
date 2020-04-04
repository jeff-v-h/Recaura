namespace Dawn.Domain.Entities
{
    public class ResistedIsometricTest : ActionBase
    {
        public int ObjectiveAssessmentId { get; set; }
        public int Value { get; set; }

        // Navigation property
        public ObjectiveAssessment ObjectiveAssessment { get; set; }
    }
}
