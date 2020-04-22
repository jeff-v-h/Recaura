using AutoMapper;
using Recaura.Application.Common.Mappings;
using Xunit;

namespace Recaura.Application.UnitTests
{
    public sealed class CommandTestFixture
    {
        public IMapper Mapper { get; }

        public CommandTestFixture()
        {
            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            Mapper = configurationProvider.CreateMapper();
        }
    }

    [CollectionDefinition("CommandTests")]
    public class CommandCollection : ICollectionFixture<CommandTestFixture> { }
}
