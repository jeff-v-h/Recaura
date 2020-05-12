using System;

namespace Recaura.Application.Common.Interfaces.Time
{
    public interface IDateTime
    {
        DateTime UtcNow { get; }
    }
}
