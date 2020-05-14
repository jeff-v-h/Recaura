using AutoMapper;
using FluentAssertions;
using Recaura.Application.Common.Exceptions;
using Recaura.Application.Features.CaseFiles.GetCasefile;
using Recaura.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Recaura.Application.UnitTests.Features.CaseFiles.GetCasefile
{
    [Collection("QueryTests")]
    public class GetCaseFileQueryTests
    {
        private readonly RecauraDbContext _context;
        private readonly IMapper _mapper;

        public GetCaseFileQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrectVmAndCaseFile()
        {
            var query = new GetCaseFileQuery { Id = 1 };

            var handler = new GetCaseFileQuery.GetCaseFileQueryHandler(_context, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.Should().BeOfType<GetCaseFileVm>();
            result.Id.Should().Be(1);
            result.Name.Should().Be("Lower Back Injury");
        }

        [Fact]
        public async Task Handle_NoMatchingId_ThrowsNotFoundException()
        {
            var query = new GetCaseFileQuery { Id = 99 };

            var handler = new GetCaseFileQuery.GetCaseFileQueryHandler(_context, _mapper);

            Func<Task> action = () => handler.Handle(query, CancellationToken.None);

            await action.Should().ThrowExactlyAsync<NotFoundException>();
        }
    }
}

