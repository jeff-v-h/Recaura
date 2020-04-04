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
        public DbSet<Practitioner> Practitioners { get; set; }
        public DbSet<SubjectiveAssessment> SubjectiveAssessments { get; set; }
        public DbSet<ObjectiveAssessment> ObjectiveAssessments { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<ForwardPlan> ForwardPlans { get; set; }

        public DbSet<ActiveTest> ActiveTests { get; set; }
        public DbSet<PassiveTest> PassiveTests { get; set; }
        public DbSet<ResistedIsometricTest> ResistedIsometricTests { get; set; }
        public DbSet<FunctionalTest> FunctionalTests { get; set; }
        public DbSet<NeurologicalTest> NeurologicalTests { get; set; }
        public DbSet<SpecialTest> SpecialTests { get; set; }

        #endregion DbSets

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
