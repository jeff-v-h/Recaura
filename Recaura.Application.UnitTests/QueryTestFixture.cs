using AutoMapper;
using Recaura.Application.Common.Mappings;
using Recaura.Persistence;
using System;
using Xunit;

namespace Recaura.Application.UnitTests
{
    public sealed class QueryTestFixture : IDisposable
    {
        public RecauraDbContext Context { get; }
        public IMapper Mapper { get; }

        public QueryTestFixture()
        {
            Context = RecauraDbContextFactory.Create();

            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            Mapper = configurationProvider.CreateMapper();
        }

        public void Dispose()
        {
            RecauraDbContextFactory.Destroy(Context);
        }
    }

    [CollectionDefinition("QueryTests")]
    public class QueryCollection : ICollectionFixture<QueryTestFixture> { }
}
