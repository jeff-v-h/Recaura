using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class ObjectiveAssessment
    {
        public string Observation { get; set; }
        public List<MovementTest> Active { get; set; }
        public List<MovementTest> Passive { get; set; }
        public List<MovementTest> ResistedIsometric  { get; set; }
        public List<GenericTest> FunctionalTests { get; set; }
        public List<DiagnosticTest> NeurologicalTests { get; set; }
        public List<DiagnosticTest> SpecialTests { get; set; }
        public List<string> Palpation { get; set; }
        public string Additional { get; set; }
    }
}
