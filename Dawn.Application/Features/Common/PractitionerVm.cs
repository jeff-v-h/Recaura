using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Common
{
    public class PractitionerVm : IMapFrom<Practitioner>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobLevel { get; set; }
    }
}
