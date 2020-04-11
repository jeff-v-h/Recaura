﻿using Dawn.Application.Features.ObjectiveAx.Queries.GetObjectiveAssessment;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
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
