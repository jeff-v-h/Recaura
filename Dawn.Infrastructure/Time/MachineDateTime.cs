using Dawn.Application.Common.Interfaces.Time;
using System;

namespace Dawn.Infrastructure.Time
{
    public class MachineDateTime : IDateTime
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
