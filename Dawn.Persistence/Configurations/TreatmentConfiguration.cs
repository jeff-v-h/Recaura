using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{
    public class TreatmentConfiguration : IEntityTypeConfiguration<Treatment>
    {
        public void Configure(EntityTypeBuilder<Treatment> entity)
        {
            entity.ToTable("Treatments");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.ConsultationId).IsRequired();

            entity.Property(e => e.Name)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.Quantity)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.Comment)
                .HasColumnType("nvarchar(200)");

            entity.HasOne(p => p.Consultation)
                .WithMany(e => e.Treatments)
                .HasForeignKey(p => p.ConsultationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}