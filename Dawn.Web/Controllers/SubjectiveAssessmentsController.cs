using Dawn.Application.Features.SubjectiveAx.Queries.GetSubjectiveAssessment;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    [Route("api/subjective")]
    public class SubjectiveAssessmentsController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GetSubjectiveAssessmentVm>> Get(int id)
        {
            return await Mediator.Send(new GetSubjectiveAssessmentQuery { Id = id });
        }
    }
}
