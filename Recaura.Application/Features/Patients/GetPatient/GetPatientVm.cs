using Recaura.Application.Common.Mappings;
using Recaura.Application.Common.Models;
using Recaura.Domain.Entities;
using System.Collections.Generic;

namespace Recaura.Application.Features.Patients.GetPatient
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
