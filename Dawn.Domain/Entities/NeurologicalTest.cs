using Dawn.Domain.Enums;

namespace Dawn.Domain.Entities
{
    public class NeurologicalTest : ActionBase
    {
        public int ObjectiveAssessmentId { get; set; }
        public DiagnosticResult Result { get; set; }

        // Navigation property
        public ObjectiveAssessment ObjectiveAssessment { get; set; }
    }
}
