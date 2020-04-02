using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dawn.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DawnDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DawnDb"),
                    b => b.MigrationsAssembly(typeof(DawnDbContext).Assembly.FullName)));

            return services;
        }
    }
}
