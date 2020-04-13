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
        public IReadOnlyCollection<ConsultationVm> Consultations { get; set; }
        public PatientVm Patient { get; set; }
    }

    public class ConsultationVm : IMapFrom<Consultation>
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public int PractitionerId { get; set; }
    }

    public class PatientVm : IMapFrom<Patient>
    {
        public int Id { get; set; }
        public Honorific Honorific { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Occupation { get; set; }
    }
}
