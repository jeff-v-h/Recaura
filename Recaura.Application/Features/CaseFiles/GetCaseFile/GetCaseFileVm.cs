using Recaura.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Recaura.Application.Features.CaseFiles.GetCaseFile
{
    public class GetCaseFileVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public IReadOnlyCollection<ConsultVm> Consultations { get; set; }
        public FilesPatientVm Patient { get; set; }
    }

    public class ConsultVm
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public int PractitionerId { get; set; }
    }

    public class FilesPatientVm
    {
        public int Id { get; set; }
        public Honorific Honorific { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Occupation { get; set; }
    }
}
