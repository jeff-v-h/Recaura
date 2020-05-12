using Recaura.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Recaura.Application.Common.Interfaces.Persistence
{
    public interface IRecauraDbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public DbSet<CaseFile> CaseFiles { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<Practitioner> Practitioners { get; set; }
        public DbSet<SubjectiveAssessment> SubjectiveAssessments { get; set; }
        public DbSet<ObjectiveAssessment> ObjectiveAssessments { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
