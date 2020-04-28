using Recaura.Application.Common.Interfaces.Persistence;
using Recaura.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Recaura.Persistence
{
    public class RecauraDbContext : DbContext, IRecauraDbContext
    {
        public RecauraDbContext(DbContextOptions options) : base(options)
        {
        }

        #region - - - - - - - DbSets - - - - - - -

        public DbSet<Patient> Patients { get; set; }
        public DbSet<CaseFile> CaseFiles { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<Practitioner> Practitioners { get; set; }
        public DbSet<SubjectiveAssessment> SubjectiveAssessments { get; set; }
        public DbSet<ObjectiveAssessment> ObjectiveAssessments { get; set; }

        #endregion DbSets

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
