using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class FunctionalTestVm : IMapFrom<FunctionalTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Result { get; set; }
    }
}
