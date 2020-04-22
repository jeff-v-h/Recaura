using AutoMapper;
using FluentAssertions;
using Recaura.Application.Common.Exceptions;
using Recaura.Application.Features.Consultations.UpdateConsultation;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Recaura.Application.UnitTests.Features.Consultations.UpdateConsultation
{
    [Collection("CommandTests")]
    public class UpdateConsultationCommandTests : CommandTestBase
    {
        private readonly IMapper _mapper;

        public UpdateConsultationCommandTests(CommandTestFixture fixture)
        {
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_GivenValidId_ShouldUpdatePersistedTodoList()
        {
            var command = new UpdateConsultationCommand
            {
                Id = 2,
                Number = 2,
                Plans = "rv one more time this week"
            };

            var handler = new UpdateConsultationCommand.UpdateConsultationCommandHandler(Context, _mapper);

            await handler.Handle(command, CancellationToken.None);

            var entity = Context.Consultations.Find(command.Id);

            entity.Should().NotBeNull();
            entity.Plans.Should().Be(command.Plans);
        }

        [Fact]
        public async Task Handle_GivenInvalidId_ThrowsException()
        {
            var command = new UpdateConsultationCommand
            {
                Id = 99,
                Plans = "rv daily",
            };

            var handler = new UpdateConsultationCommand.UpdateConsultationCommandHandler(Context, _mapper);

            Func<Task> action = () => handler.Handle(command, CancellationToken.None);

            await action.Should().ThrowExactlyAsync<NotFoundException>();
        }
    }
}
