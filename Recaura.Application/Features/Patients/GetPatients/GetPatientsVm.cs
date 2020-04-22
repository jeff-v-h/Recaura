using AutoMapper;
using Recaura.Application.Common.Mappings;
using Recaura.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Recaura.Application.Features.Patients.GetPatients
{
    public class GetPatientsVm : IMapFrom<List<Patient>>
    {
        public IReadOnlyCollection<PatientVm> Patients { get; set; } = Array.Empty<PatientVm>();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<List<Patient>, GetPatientsVm>()
                .ForMember(d => d.Patients, opt => opt.MapFrom(s => s));
        }
    }

    public class PatientVm : IMapFrom<Patient>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
    }
}
