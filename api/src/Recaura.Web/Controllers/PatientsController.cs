using Recaura.Application.Features.Patients.GetPatient;
using Recaura.Application.Features.Patients.GetPatients;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Recaura.Web.Controllers
{
    [ApiController]
    public class PatientsController : ApiControllerBase
    {
        private IConfiguration _configuration;
        public PatientsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<GetPatientsVm>> Get()
        {
            //return await Mediator.Send(new GetPatientsQuery());
            var connString = _configuration["ConnectionStrings:RecauraDb"];
            var conn = _configuration.GetConnectionString("RecauraDb");
            return new GetPatientsVm
            {
                Patients = new List<PatientVm>
                {
                    new PatientVm
                    {
                        Id = 1111,
                        FirstName = connString,
                        LastName = conn,
                        DOB = DateTime.UtcNow
                    }
                }
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetPatientVm>> Get(int id)
        {
            return await Mediator.Send(new GetPatientQuery { Id = id });
        }
    }
}
