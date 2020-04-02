using System;
using System.Collections.Generic;
using System.Text;

namespace Dawn.Domain.Entities
{
    public class InjuryFile
    {
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public List<InjuryEpisode> Episodes { get; set; }
    }
}
