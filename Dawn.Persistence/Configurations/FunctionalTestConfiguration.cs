using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{
    public class FunctionalTestConfiguration : IEntityTypeConfiguration<FunctionalTest>
    {
        public void Configure(EntityTypeBuilder<FunctionalTest> entity)
        {
            entity.ToTable("FunctionalTests");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.ObjectiveAssessmentId).IsRequired();

            entity.Property(e => e.Name)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.Result)
                .HasColumnType("nvarchar(50)");

            entity.Property(e => e.Comment)
                .HasColumnType("nvarchar(200)");

            entity.HasOne(p => p.ObjectiveAssessment)
                .WithMany(e => e.FunctionalTests)
                .HasForeignKey(p => p.ObjectiveAssessmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
