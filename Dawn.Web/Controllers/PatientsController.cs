using Dawn.Application.Features.Patients;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    public class PatientsController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GetPatientVm>> Get(int id)
        {
            return await Mediator.Send(new GetPatientQuery { Id = id });
        }
    }
}
