using Recaura.Persistence;
using System;

namespace Recaura.Application.UnitTests
{
    public class CommandTestBase : IDisposable
    {
        public RecauraDbContext Context { get; }

        public CommandTestBase()
        {
            Context = RecauraDbContextFactory.Create();
        }

        public void Dispose()
        {
            RecauraDbContextFactory.Destroy(Context);
        }
    }
}
