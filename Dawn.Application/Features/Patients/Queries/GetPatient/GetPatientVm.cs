using Dawn.Application.Common.Mappings;
using Dawn.Application.Features.Common;
using Dawn.Domain.Entities;
using System.Collections.Generic;

namespace Dawn.Application.Features.Patients.Queries.GetPatient
{
    public class GetPatientVm : PersonVm, IMapFrom<Patient>
    {
        public string Occupation { get; set; }
        public IReadOnlyCollection<CaseFileVm> CaseFiles { get; set; }
    }
}
