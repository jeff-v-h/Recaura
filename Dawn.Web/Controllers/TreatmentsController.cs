using Dawn.Application.Features.Treatments.Queries.GetTreatments;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    [Route("api")]
    public class TreatmentsController : ApiControllerBase
    {
        [HttpGet("consultations/{consultationId}/treatments")]
        public async Task<ActionResult<GetTreatmentsVm>> Get(int consultationId)
        {
            return await Mediator.Send(new GetTreatmentsQuery { ConsultationId = consultationId });
        }
    }
}
