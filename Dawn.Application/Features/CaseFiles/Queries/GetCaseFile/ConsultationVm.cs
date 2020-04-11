using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;
using System;

namespace Dawn.Application.Features.CaseFiles.Queries.GetCaseFile
{
    public class ConsultationVm : IMapFrom<Consultation>
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public int PractitionerId { get; set; }
    }
}
