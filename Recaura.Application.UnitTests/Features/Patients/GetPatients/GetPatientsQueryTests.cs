using AutoMapper;
using FluentAssertions;
using Recaura.Application.Features.Patients.GetPatients;
using Recaura.Persistence;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Recaura.Application.UnitTests.Features.Patients.GetPatients
{
    [Collection("QueryTests")]
    public class GetPatientsQueryTests
    {
        private readonly RecauraDbContext _context;
        private readonly IMapper _mapper;

        public GetPatientsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrectVm()
        {
            var query = new GetPatientsQuery();

            var handler = new GetPatientsQuery.GetPatientsQueryHandler(_context, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.Should().BeOfType<GetPatientsVm>();
            result.Patients.Count.Should().Be(2);
        }
    }
}
