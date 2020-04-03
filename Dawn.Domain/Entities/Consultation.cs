using System;

namespace Dawn.Domain.Entities
{
    public class Consultation
    {
        public int Id { get; set; }
        public int CaseFileId { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public int PractitionerId { get; set; }
    }
}
