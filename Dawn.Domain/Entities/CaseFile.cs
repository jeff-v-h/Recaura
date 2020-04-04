using System;
using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class CaseFile
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public List<Consultation> Consultations { get; set; }

        // Navigation Property
        public Patient Patient { get; set; }
    }
}
