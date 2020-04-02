namespace Dawn.Domain.Entities
{
    public class Patient : Person
    {
        public string Occupation { get; set; }
        public MedicalRecord MedicalRecord { get; set; }
    }
}
