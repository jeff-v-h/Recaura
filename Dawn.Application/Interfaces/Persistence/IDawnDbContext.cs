using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Interfaces.Persistence
{
    public interface IDawnDbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<InjuryFile> InjuryFiles { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<Physiotherapist> Physio { get; set; }
        public DbSet<SubjectiveAssessment> SubjectiveAssessments { get; set; }
        public DbSet<ObjectiveAssessment> ObjectiveAssessments { get; set; }
        public DbSet<Treatment> Treatments { get; set; }

        public DbSet<MovementTest> ActiveRomTests { get; set; }
        public DbSet<MovementTest> PassiveRomTests { get; set; }
        public DbSet<MovementTest> ResistedIsometricTests { get; set; }
        public DbSet<GenericTest> FunctionalTests { get; set; }
        public DbSet<DiagnosticTest> NeurologicalTests { get; set; }
        public DbSet<DiagnosticTest> SpecialTests { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
