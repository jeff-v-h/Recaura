using Dawn.Application.Interfaces.Persistence;
using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Dawn.Persistence
{
    public class DawnDbContext : DbContext, IDawnDbContext
    {
        public DawnDbContext(DbContextOptions options) : base(options)
        {
        }

        #region - - - - - - - DbSets - - - - - - -

        public DbSet<Patient> Patients { get; set; }
        public DbSet<CaseFile> CaseFiles { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<Physiotherapist> Physio { get; set; }
        public DbSet<SubjectiveAssessment> SubjectiveAssessments { get; set; }
        public DbSet<ObjectiveAssessment> ObjectiveAssessments { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<ForwardPlan> ForwardPlans { get; set; }

        public DbSet<MovementTest> ActiveTests { get; set; }
        public DbSet<MovementTest> PassiveTests { get; set; }
        public DbSet<MovementTest> ResistedIsometricTests { get; set; }
        public DbSet<GenericTest> FunctionalTests { get; set; }
        public DbSet<DiagnosticTest> NeurologicalTests { get; set; }
        public DbSet<DiagnosticTest> SpecialTests { get; set; }

        #endregion DbSets

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
