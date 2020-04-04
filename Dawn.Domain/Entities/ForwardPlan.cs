namespace Dawn.Domain.Entities
{
    public class ForwardPlan : ActionBase
    {
        public int ConsultationId { get; set; }

        // Navigation property
        public Consultation Consultation { get; set; }
    }
}
