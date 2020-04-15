using Dawn.Application.Features.Consultations.GetConsultation;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dawn.Web.Controllers
{
    [ApiController]
    public class ConsultationsController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GetConsultationVm>> Get(int id)
        {
            return await Mediator.Send(new GetConsultationQuery { Id = id });
        }
    }
}
