using Dawn.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dawn.Domain.Entities
{
    public class SpecialTest : ActionBase
    {
        public int ObjectiveAssessmentId { get; set; }
        public DiagnosticResult Result { get; set; }

        // Navigation property
        public ObjectiveAssessment ObjectiveAssessment { get; set; }
    }
}
