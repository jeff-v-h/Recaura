using Dawn.Application.Features.Plans.Queries.GetPlans;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    [Route("api")]
    public class PlansController : ApiControllerBase
    {
        [HttpGet("consultations/{consultationId}/plans")]
        public async Task<ActionResult<GetPlansVm>> Get(int consultationId)
        {
            return await Mediator.Send(new GetPlansQuery { ConsultationId = consultationId });
        }
    }
}
