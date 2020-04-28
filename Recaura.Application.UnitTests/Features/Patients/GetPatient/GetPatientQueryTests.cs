using AutoMapper;
using FluentAssertions;
using Recaura.Application.Common.Exceptions;
using Recaura.Application.Features.Patients.GetPatient;
using Recaura.Domain.Enums;
using Recaura.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Recaura.Application.UnitTests.Features.Patients.GetPatient
{
    [Collection("QueryTests")]
    public class GetPatientQueryTests
    {
        private readonly RecauraDbContext _context;
        private readonly IMapper _mapper;

        public GetPatientQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrectVmAndPatient()
        {
            var query = new GetPatientQuery { Id = 1 };

            var handler = new GetPatientQuery.GetPatientQueryHandler(_context, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.Should().BeOfType<GetPatientVm>();
            result.Id.Should().Be(1);
            result.Honorific.Should().Be(Honorific.Mr);
            result.FirstName.Should().Be("Jay");
        }

        [Fact]
        public async Task Handle_NoMatchingId_ThrowsNotFoundException()
        {
            var query = new GetPatientQuery { Id = 3 };

            var handler = new GetPatientQuery.GetPatientQueryHandler(_context, _mapper);

            Func<Task> action = () => handler.Handle(query, CancellationToken.None);

            await action.Should().ThrowExactlyAsync<NotFoundException>();
        }
    }
}
