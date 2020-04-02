using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class MedicalRecord
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public List<InjuryFile> Injuries { get; set; }
    }
}
