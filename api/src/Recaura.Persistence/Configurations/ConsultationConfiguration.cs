using Recaura.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Recaura.Persistence.Configurations
{
    public class ConsultationConfiguration : IEntityTypeConfiguration<Consultation>
    {
        public void Configure(EntityTypeBuilder<Consultation> entity)
        {
            entity.ToTable("Consultations");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.CaseFileId).IsRequired();

            entity.Property(e => e.Date)
                .IsRequired()
                .HasColumnType("date");

            entity.Property(e => e.Number)
                .IsRequired();

            entity.Property(e => e.PractitionerId)
                .IsRequired();

            entity.HasOne(e => e.CaseFile)
                .WithMany(e => e.Consultations)
                .HasForeignKey(e => e.CaseFileId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Practitioner)
                .WithMany(e => e.Consultations)
                .HasForeignKey(e => e.PractitionerId)
                .OnDelete(DeleteBehavior.Cascade);

            //entity.HasOne(e => e.SubjectiveAssessment)
            //    .WithOne(e => e.Consultation)
            //    .HasForeignKey<SubjectiveAssessment>(e => e.ConsultationId)
            //    .OnDelete(DeleteBehavior.Cascade);

            //entity.HasOne(e => e.ObjectiveAssessment)
            //    .WithOne(e => e.Consultation)
            //    .HasForeignKey<ObjectiveAssessment>(e => e.ConsultationId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
