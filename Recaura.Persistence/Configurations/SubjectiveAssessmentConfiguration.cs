using Recaura.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Recaura.Persistence.Configurations
{
    public class SubjectiveAssessmentConfiguration : IEntityTypeConfiguration<SubjectiveAssessment>
    {
        public void Configure(EntityTypeBuilder<SubjectiveAssessment> entity)
        {
            entity.ToTable("SubjectiveAssessments");

            entity.Property(e => e.Id).IsRequired();

            entity.Property(e => e.ConsultationId)
                .IsRequired();

            entity.Property(e => e.AggravatingFactors)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.EasingFactors)
                .HasColumnType("nvarchar(100)");

            entity.HasOne(e => e.Consultation)
                .WithOne(e => e.SubjectiveAssessment)
                .HasForeignKey<SubjectiveAssessment>(e => e.ConsultationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
