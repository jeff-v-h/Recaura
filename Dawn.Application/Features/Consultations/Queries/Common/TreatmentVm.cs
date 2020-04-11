using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Consultations.Queries.Common
{
    public class TreatmentVm : IMapFrom<Treatment>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Quantity { get; set; }
    }
}
