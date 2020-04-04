using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{
    public class PassiveTestConfiguration : IEntityTypeConfiguration<PassiveTest>
    {
        public void Configure(EntityTypeBuilder<PassiveTest> entity)
        {
            entity.ToTable("PassiveTests");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.ObjectiveAssessmentId).IsRequired();

            entity.Property(e => e.Name)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.Value)
                .HasColumnType("decimal");

            entity.Property(e => e.Comment)
                .HasColumnType("nvarchar(200)");

            entity.HasOne(p => p.ObjectiveAssessment)
                .WithMany(e => e.Passive)
                .HasForeignKey(p => p.ObjectiveAssessmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
