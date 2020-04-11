using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Patients.Queries.GetPatient
{
    public class CaseFileVm : IMapFrom<CaseFile>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
