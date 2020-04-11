using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class ActiveTestVm : IMapFrom<ActiveTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public decimal Value { get; set; }
    }
}
