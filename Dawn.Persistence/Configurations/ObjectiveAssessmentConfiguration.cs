using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{
    public class ObjectiveAssessmentConfiguration : IEntityTypeConfiguration<ObjectiveAssessment>
    {
        public void Configure(EntityTypeBuilder<ObjectiveAssessment> entity)
        {
            entity.ToTable("ObjectiveAssessments");

            entity.Property(e => e.Id).IsRequired();

            entity.Property(e => e.ConsultationId).IsRequired();

            entity.HasOne(e => e.Consultation)
                .WithOne(e => e.ObjectiveAssessment)
                .HasForeignKey<ObjectiveAssessment>(e => e.ConsultationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
