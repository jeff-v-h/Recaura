using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;
using Dawn.Domain.Enums;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class NeurologicalTestVm : IMapFrom<NeurologicalTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DiagnosticResult Result { get; set; }
    }
}
