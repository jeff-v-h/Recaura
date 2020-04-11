using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Dawn.Application.Features.CaseFiles.Queries.GetCaseFile
{
    public class GetCaseFileVm : IMapFrom<CaseFile>
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public IReadOnlyCollection<ConsultationVm> Consultations { get; set; }
    }
}
