using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dawn.Application.Features.Patients;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Dawn.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<GetPatientVm>> Get([FromRoute] int id)
        {
            return await Mediator.Send(new GetPatientQuery());
        }
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
