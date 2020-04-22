using Recaura.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Recaura.Persistence.Configurations
{
    public class PractitionerConfiguration : IEntityTypeConfiguration<Practitioner>
    {
        public void Configure(EntityTypeBuilder<Practitioner> entity)
        {
            entity.ToTable("Practitioners");

            entity.Property(e => e.Id).IsRequired();

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

            entity.Property(t => t.JobLevel)
                .HasColumnType("nvarchar(50)");

            entity.Property(t => t.RegistrationID)
                .HasColumnType("nvarchar(50)");
        }
    }
}
