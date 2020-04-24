using Recaura.Application.Features.Consultations.GetConsultation;
using Recaura.Application.Features.Consultations.UpdateConsultation;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Recaura.Web.Controllers
{
    [ApiController]
    public class ConsultationsController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GetConsultationVm>> Get(int id)
        {
            return await Mediator.Send(new GetConsultationQuery { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateConsultationCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
