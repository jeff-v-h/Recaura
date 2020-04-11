using Dawn.Application.Common.Models;
using System.Collections.Generic;

namespace Dawn.Application.Features.Plans.Queries.GetPlans
{
    public class GetPlansVm
    {
        public IReadOnlyCollection<ForwardPlanVm> Plans { get; set; }
    }
}
