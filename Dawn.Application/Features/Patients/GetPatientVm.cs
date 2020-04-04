using Dawn.Application.Common.Mappings;
using Dawn.Application.Features.Common;
using Dawn.Domain.Entities;
using System.Collections.Generic;

namespace Dawn.Application.Features.Patients
{
    public class GetPatientVm : PersonVm, IMapFrom<Patient>
    {
        public string Occupation { get; set; }
        public List<PatientCaseFileVm> CaseFiles { get; set; }
    }
}
