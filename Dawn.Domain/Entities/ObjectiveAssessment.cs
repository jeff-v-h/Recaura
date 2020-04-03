using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class ObjectiveAssessment
    {
        public int Id { get; set; }
        public int ConsultationId { get; set; }
        public string Observation { get; set; }
        public List<ActiveTest> Active { get; set; }
        public List<PassiveTest> Passive { get; set; }
        public List<ResistedIsometricTest> ResistedIsometric  { get; set; }
        public List<FunctionalTest> FunctionalTests { get; set; }
        public List<NeurologicalTest> NeurologicalTests { get; set; }
        public List<SpecialTest> SpecialTests { get; set; }
        public string Palpation { get; set; }
        public string Additional { get; set; }
    }
}
