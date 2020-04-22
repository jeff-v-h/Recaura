using AutoMapper;
using FluentAssertions;
using Recaura.Application.Common.Exceptions;
using Recaura.Application.Features.Consultations.GetConsultation;
using Recaura.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Recaura.Application.UnitTests.Features.Consultations.GetConsultation
{
    [Collection("QueryTests")]
    public class GetConsultationQueryTests
    {
        private readonly RecauraDbContext _context;
        private readonly IMapper _mapper;

        public GetConsultationQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrectVmAndCaseFile()
        {
            var query = new GetConsultationQuery { Id = 1 };

            var handler = new GetConsultationQuery.GetConsultationQueryHandler(_context, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.Should().BeOfType<GetConsultationVm>();
            result.Id.Should().Be(1);
            result.Number.Should().Be(1);
            result.Plans.Should().Be("rv by end of week. ease into hydrotherapy when able");
        }

        [Fact]
        public async Task Handle_NoMatchingId_ThrowsNotFoundException()
        {
            var query = new GetConsultationQuery { Id = 99 };

            var handler = new GetConsultationQuery.GetConsultationQueryHandler(_context, _mapper);

            Func<Task> action = () => handler.Handle(query, CancellationToken.None);

            await action.Should().ThrowExactlyAsync<NotFoundException>();
        }
    }
}

