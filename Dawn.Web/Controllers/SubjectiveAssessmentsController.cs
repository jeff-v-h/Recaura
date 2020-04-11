using Dawn.Application.Features.SubjectiveAx.Queries.GetSubjectiveAssessment;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    [Route("api")]
    public class SubjectiveAssessmentsController : ApiControllerBase
    {
        [HttpGet("consultations/{consultationId}/subjective")]
        public async Task<ActionResult<GetSubjectiveAssessmentVm>> Get(int consultationId)
        {
            return await Mediator.Send(new GetSubjectiveAssessmentQuery { ConsultationId = consultationId });
        }
    }
}
