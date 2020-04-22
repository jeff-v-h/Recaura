using Recaura.Application.Common.Interfaces.Time;
using Recaura.Infrastructure.Time;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Recaura.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddSingleton<IDateTime, MachineDateTime>();
            return services;
        }
    }
}
