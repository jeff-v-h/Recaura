using Recaura.Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Recaura.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<RecauraDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("RecauraDb"), b => b.EnableRetryOnFailure()));
            //configuration.GetConnectionString("RecauraDb"),
            //b => b.MigrationsAssembly(typeof(RecauraDbContext).Assembly.FullName)));

            services.AddScoped<IRecauraDbContext>(provider => provider.GetService<RecauraDbContext>());

            return services;
        }
    }
}
