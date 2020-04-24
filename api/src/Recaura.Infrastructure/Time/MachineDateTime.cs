using Recaura.Application.Common.Interfaces.Time;
using System;

namespace Recaura.Infrastructure.Time
{
    public class MachineDateTime : IDateTime
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
