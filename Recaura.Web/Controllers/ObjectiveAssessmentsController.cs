using Recaura.Application.Features.ObjectiveAx.GetObjectiveAssessment;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Recaura.Web.Controllers
{
    [ApiController]
    [Route("api")]
    public class ObjectiveAssessmentsController : ApiControllerBase
    {
        [HttpGet("consultations/{consultationId}/objective")]
        public async Task<ActionResult<GetObjectiveAssessmentVm>> Get(int consultationId)
        {
            return await Mediator.Send(new GetObjectiveAssessmentQuery { ConsultationId = consultationId });
        }
    }
}

