using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Common.Models
{
    public class TreatmentVm : IMapFrom<Treatment>
    {
        public int Id { get; set; }
        public int ConsultationId { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Quantity { get; set; }
    }
}
