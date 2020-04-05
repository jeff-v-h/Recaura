using System;

namespace Dawn.Application.Common.Interfaces.Time
{
    public interface IDateTime
    {
        DateTime UtcNow { get; }
    }
}
