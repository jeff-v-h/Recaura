using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Common.Models
{
    public class ForwardPlanVm : IMapFrom<ForwardPlan>
    {
        public int Id { get; set; }
        public int ConsultationId { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
    }
}
