using Dawn.Application.Features.Patients.Queries.GetPatient;
using Dawn.Application.Features.Patients.Queries.GetPatients;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    public class PatientsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<GetPatientsVm>> Get()
        {
            return await Mediator.Send(new GetPatientsQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetPatientVm>> Get(int id)
        {
            return await Mediator.Send(new GetPatientQuery { Id = id });
        }
    }
}
