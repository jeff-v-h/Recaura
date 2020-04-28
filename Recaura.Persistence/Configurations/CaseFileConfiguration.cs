using Recaura.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Recaura.Persistence.Configurations
{
    public class CaseFileConfiguration : IEntityTypeConfiguration<CaseFile>
    {
        public void Configure(EntityTypeBuilder<CaseFile> entity)
        {
            entity.ToTable("CaseFiles");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.PatientId).IsRequired();

            entity.Property(e => e.Name)
                .IsRequired();

            entity.Property(e => e.Created)
                .IsRequired()
                .HasColumnType("date");

            // requires Patient navigation property in CaseFile class
            entity.HasOne(p => p.Patient)
                .WithMany(e => e.CaseFiles)
                .HasForeignKey(p => p.PatientId)
                .OnDelete(DeleteBehavior.Cascade);

            // doesnt require navigation property in CaseFile class
            //entity.HasOne<Patient>()
            //    .WithMany()
            //    .HasForeignKey(p => p.PatientId)
            //    .OnDelete(DeleteBehavior.Cascade);

            // When referencing other way around (down to Consultation rather than up from consultation)
            //entity.HasMany(p => p.Consultations)
            //    .WithOne()
            //    .HasForeignKey(p => p.CaseFileId);
        }
    }
}
