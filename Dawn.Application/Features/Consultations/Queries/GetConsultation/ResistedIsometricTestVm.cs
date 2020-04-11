using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class ResistedIsometricTestVm : IMapFrom<ResistedIsometricTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public int Value { get; set; }
    }
}
