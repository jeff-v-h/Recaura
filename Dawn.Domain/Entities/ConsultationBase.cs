using System;
using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public abstract class ConsultationBase
    {
        public Physiotherapist Physio { get; set; }
        public DateTime Date { get; set; }
        public ObjectiveAssessment Objective { get; set; }
        public Treatment Treatment { get; set; }
        public List<string> Plan { get; set; }
    }
}
