using Dawn.Application.Common.Models;
using System.Collections.Generic;

namespace Dawn.Application.Features.Treatments.Queries.GetTreatments
{
    public class GetTreatmentsVm
    {
        public IReadOnlyCollection<TreatmentVm> Treatments { get; set; }
    }
}
