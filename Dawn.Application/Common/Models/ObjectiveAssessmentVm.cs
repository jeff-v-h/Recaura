using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Common.Models
{
    public class ObjectiveAssessmentVm : IMapFrom<ObjectiveAssessment>
    {
        public int Id { get; set; }
        public int ConsultationId { get; set; }
        public string Observation { get; set; }
        public string Active { get; set; }
        public string Passive { get; set; }
        public string ResistedIsometric { get; set; }
        public string FunctionalTests { get; set; }
        public string NeurologicalTests { get; set; }
        public string SpecialTests { get; set; }
        public string Palpation { get; set; }
        public string Additional { get; set; }
    }
}
