using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;

namespace Dawn.Application.Features.Patients
{
    public class PatientCaseFileVm : IMapFrom<CaseFile>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
