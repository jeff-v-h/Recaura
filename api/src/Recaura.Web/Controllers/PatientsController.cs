using Recaura.Application.Features.Patients.GetPatient;
using Recaura.Application.Features.Patients.GetPatients;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace Recaura.Web.Controllers
{
    [ApiController]
    public class PatientsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<GetPatientsVm>> Get()
        {
            //return await Mediator.Send(new GetPatientsQuery());
            return new GetPatientsVm
            {
                Patients = new List<PatientVm>
                {
                    new PatientVm
                    {
                        Id = 1111,
                        FirstName = "Test",
                        LastName = "Person",
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
