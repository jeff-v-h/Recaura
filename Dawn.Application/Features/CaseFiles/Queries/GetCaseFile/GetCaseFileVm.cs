using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;
using Dawn.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Dawn.Application.Features.CaseFiles.Queries.GetCaseFile
{
    public class GetCaseFileVm : IMapFrom<CaseFile>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public IReadOnlyCollection<ConsultVm> Consultations { get; set; }
        public FilesPatientVm Patient { get; set; }
    }

    public class ConsultVm : IMapFrom<Consultation>
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public int PractitionerId { get; set; }
    }

    public class FilesPatientVm : IMapFrom<Patient>
    {
        public int Id { get; set; }
        public Honorific Honorific { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Occupation { get; set; }
    }
}
