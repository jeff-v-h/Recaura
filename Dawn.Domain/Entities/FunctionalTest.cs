namespace Dawn.Domain.Entities
{
    public class FunctionalTest: ActionBase
    {
        public int ObjectiveAssessmentId { get; set; }
        public string Result { get; set; }

        // Navigation property
        public ObjectiveAssessment ObjectiveAssessment { get; set; }
    }
}
