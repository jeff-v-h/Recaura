using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class Practitioner : Person
    {
        public string JobLevel { get; set; }
        public string RegistrationID { get; set; }
        public List<Consultation> Consultations { get; set; }
    }
}
