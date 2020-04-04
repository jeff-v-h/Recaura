using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{
    public class ForwardPlanConfiguration : IEntityTypeConfiguration<ForwardPlan>
    {
        public void Configure(EntityTypeBuilder<ForwardPlan> entity)
        {
            entity.ToTable("ForwardPlans");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.ConsultationId).IsRequired();

            entity.Property(e => e.Name)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.Comment)
                .HasColumnType("nvarchar(200)");

            entity.HasOne(p => p.Consultation)
                .WithMany(e => e.Plans)
                .HasForeignKey(p => p.ConsultationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}