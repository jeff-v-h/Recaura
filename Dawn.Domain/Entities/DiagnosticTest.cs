using Dawn.Domain.Enums;

namespace Dawn.Domain.Entities
{
    public class DiagnosticTest : ActionBase
    {
        public int ObjectiveAssessmentId { get; set; }
        public DiagnosticResult Result { get; set; }
    }
}
