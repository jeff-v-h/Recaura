using Recaura.Application.Common.Mappings;
using Recaura.Domain.Entities;

namespace Recaura.Application.Common.Models
{
    public class PractitionerVm : IMapFrom<Practitioner>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobLevel { get; set; }
    }
}
