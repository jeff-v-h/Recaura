using Dawn.Application.Common.Models;
using System.Collections.Generic;

namespace Dawn.Application.Features.Treatments.Queries.GetTreatments
{
    public class GetTreatmentsVm
    {
        public int ConsultationId { get; set; }
        public IReadOnlyCollection<TreatmentVm> Treatments { get; set; }
    }
}
