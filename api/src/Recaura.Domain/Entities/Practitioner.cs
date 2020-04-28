using System.Collections.Generic;

namespace Recaura.Domain.Entities
{
    public class Practitioner : Person
    {
        public string JobLevel { get; set; }
        public string RegistrationID { get; set; }
        public List<Consultation> Consultations { get; set; }
    }
}
