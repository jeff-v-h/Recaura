using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class InjuryEpisode
    {
        public InitialConsultation Initial { get; set; }
        public List<StandardConsultation> Standards { get; set; }
    }
}
