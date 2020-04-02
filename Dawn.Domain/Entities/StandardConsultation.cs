namespace Dawn.Domain.Entities
{
    public class StandardConsultation : ConsultationBase
    {
        public int Number { get; set; }
        public SubjectiveFollowUp Subjective { get; set; }
    }
}
