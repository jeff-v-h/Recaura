using Dawn.Application.Features.Common;
using System.Collections.Generic;

namespace Dawn.Application.Features.Patients
{
    public class GetPatientVm : PersonVm
    {
        public string Occupation { get; set; }
        public List<PatientCaseFileVm> CaseFiles { get; set; }
    }
}
