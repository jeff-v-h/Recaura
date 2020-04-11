using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;
using System.Collections.Generic;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class ObjectiveAssessmentVm : IMapFrom<ObjectiveAssessment>
    {
        public int Id { get; set; }
        public string Observation { get; set; }
        public IReadOnlyCollection<ActiveTestVm> Active { get; set; }
        public IReadOnlyCollection<PassiveTestVm> Passive { get; set; }
        public IReadOnlyCollection<ResistedIsometricTestVm> ResistedIsometric { get; set; }
        public IReadOnlyCollection<FunctionalTestVm> FunctionalTests { get; set; }
        public IReadOnlyCollection<NeurologicalTestVm> NeurologicalTests { get; set; }
        public IReadOnlyCollection<SpecialTestVm> SpecialTests { get; set; }
        public string Palpation { get; set; }
        public string Additional { get; set; }
    }
}
