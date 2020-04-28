using AutoMapper;
using Recaura.Application.Features.CaseFiles.GetCaseFile;
using Recaura.Application.Features.Consultations.GetConsultation;
using Recaura.Application.Features.Patients.GetPatient;
using Recaura.Application.Features.Patients.GetPatients;
using Recaura.Application.Features.SubjectiveAx.GetSubjectiveAssessment;
using Recaura.Domain.Entities;
using System;
using System.Collections.Generic;
using Xunit;

namespace Recaura.Application.UnitTests.Common.Mappings
{
    public class MappingTests : IClassFixture<MappingTestsFixture>
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests(MappingTestsFixture fixture)
        {
            _configuration = fixture.ConfigurationProvider;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Theory]
        [InlineData(typeof(Patient), typeof(GetPatientVm))]
        [InlineData(typeof(CaseFile), typeof(GetCaseFileVm))]
        [InlineData(typeof(Consultation), typeof(GetConsultationVm))]
        [InlineData(typeof(List<Patient>), typeof(GetPatientsVm))]
        [InlineData(typeof(SubjectiveAssessment), typeof(GetSubjectiveAssessmentVm))]
        [InlineData(typeof(GetSubjectiveAssessmentVm), typeof(SubjectiveAssessment))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            var instance = Activator.CreateInstance(source);

            _mapper.Map(instance, source, destination);
        }
    }
}
