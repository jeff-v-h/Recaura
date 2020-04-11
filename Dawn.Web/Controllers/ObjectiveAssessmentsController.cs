using Dawn.Application.Features.ObjectiveAx.Queries.GetObjectiveAssessment;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    [Route("api/objective")]
    public class ObjectiveAssessmentsController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GetObjectiveAssessmentVm>> Get(int id)
        {
            return await Mediator.Send(new GetObjectiveAssessmentQuery { Id = id });
        }
    }
}

