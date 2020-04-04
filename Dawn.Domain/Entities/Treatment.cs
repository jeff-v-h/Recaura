namespace Dawn.Domain.Entities
{
    public class Treatment : ActionBase
    {
        public int ConsultationId { get; set; }
        public string Quantity { get; set; }

        // Navigation property
        public Consultation Consultation { get; set; }
    }
}
