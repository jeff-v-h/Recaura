using System;
using System.Collections.Generic;

namespace Recaura.Application.Features.Patients.GetPatients
{
    public class GetPatientsVm
    {
        public IReadOnlyCollection<PatientVm> Patients { get; set; } = Array.Empty<PatientVm>();
    }

    public class PatientVm
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
    }
}
