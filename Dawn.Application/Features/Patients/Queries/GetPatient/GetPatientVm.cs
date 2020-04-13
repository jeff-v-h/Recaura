using Dawn.Application.Common.Mappings;
using Dawn.Application.Common.Models;
using Dawn.Domain.Entities;
using System.Collections.Generic;

namespace Dawn.Application.Features.Patients.Queries.GetPatient
{
    public class GetPatientVm : PersonVm, IMapFrom<Patient>
    {
        public string Occupation { get; set; }
        public IReadOnlyCollection<PatientCaseFileVm> CaseFiles { get; set; }
    }

    public class PatientCaseFileVm : IMapFrom<CaseFile>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
