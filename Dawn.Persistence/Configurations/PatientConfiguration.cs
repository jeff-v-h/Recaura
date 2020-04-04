using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> entity)
        {
            entity.ToTable("Patients");

            entity.Property(t => t.Id).IsRequired();

            entity.Property(t => t.Honorific)
                .HasColumnType("nvarchar(10)");

            entity.Property(t => t.FirstName)
                .IsRequired()
                .HasColumnType("nvarchar(50)");

            entity.Property(t => t.LastName)
                .IsRequired()
                .HasColumnType("nvarchar(50)");

            entity.Property(t => t.Gender)
                .IsRequired()
                .HasColumnType("nvarchar(10)");

            entity.Property(t => t.DOB)
                .IsRequired()
                .HasColumnType("date");

            entity.Property(t => t.Email)
                .IsRequired()
                .HasColumnType("nvarchar(255)");

            entity.Property(t => t.CountryCode)
                .HasColumnType("varchar(10)");

            entity.Property(t => t.HomePhone)
                .HasColumnType("nvarchar(40)");

            entity.Property(t => t.MobilePhone)
                .HasColumnType("nvarchar(40)");

            entity.Property(t => t.Occupation)
                .HasColumnType("nvarchar(50)");

            //entity.HasMany(p => p.CaseFiles)
            //    .WithOne()
            //    .HasForeignKey(p => p.PatientId);
        }
    }
}
