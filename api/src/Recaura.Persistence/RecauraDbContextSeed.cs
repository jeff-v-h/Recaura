using Recaura.Domain.Entities;
using Recaura.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Recaura.Persistence
{
    public static class RecauraDbContextSeed
    {
        public static void Initialise(IServiceProvider serviceProvider)
        {
            using (var context = new RecauraDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<RecauraDbContext>>()))
            {
                if (context.Patients.Any())
                {
                    return;
                }
                               
                context.Database.OpenConnection();

                try
                {
                    AddPatients(context);
                    AddPractitioners(context);
                    AddCaseFiles(context);
                    AddConsultations(context);
                    AddSubjectiveAssessments(context);
                    AddObjectiveAssessments(context);
                }
                finally
                {
                    context.Database.CloseConnection();
                }
            }
        }

        private static void AddPatients(RecauraDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Patients ON");
            context.Patients.AddRange(
                new Patient
                {
                    Id = 1,
                    Honorific = Honorific.Mr,
                    FirstName = "Jay",
                    LastName = "Valentine",
                    DOB = DateTime.Parse("1991-9-7"),
                    Email = "random.person@mail.com",
                    CountryCode = "AUS",
                    HomePhone = "96498888",
                    MobilePhone = "0424999999",
                    Gender = Gender.Male,
                    Occupation = "Software Developer"
                },
                new Patient
                {
                    Id = 2,
                    Honorific = Honorific.Miss,
                    FirstName = "Kay",
                    LastName = "Smith",
                    DOB = DateTime.Parse("1995-2-21"),
                    Email = "other.person@mail.com",
                    CountryCode = "AUS",
                    HomePhone = "96498877",
                    MobilePhone = "0424999777",
                    Gender = Gender.Female,
                    Occupation = "Professional Tennis Player"
                }
            );
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Patients OFF");
        }

        private static void AddPractitioners(RecauraDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Practitioners ON");
            context.Practitioners.Add(new Practitioner
            {
                Id = 1,
                Honorific = Honorific.Mr,
                FirstName = "Tim",
                LastName = "Lee",
                DOB = DateTime.Parse("1991-8-1"),
                Email = "t.lee@physiomail.com",
                CountryCode = "AUS",
                HomePhone = "96498871",
                MobilePhone = "0424991111",
                Gender = Gender.Male,
                JobLevel = "Senior",
                RegistrationID = "physio123"
            });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Practitioners OFF");
        }

        private static void AddCaseFiles(RecauraDbContext context)
        {
            var now = DateTime.UtcNow;

            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.CaseFiles ON");
            context.CaseFiles.AddRange(
                new CaseFile
                {
                    Id = 1,
                    PatientId = 1,
                    Name = "Lower Back Injury",
                    Created = now
                },
                new CaseFile
                {
                    Id = 2,
                    PatientId = 2,
                    Name = "Left Knee Injury",
                    Created = now
                }
            );
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.CaseFiles OFF");
        }

        private static void AddConsultations(RecauraDbContext context)
        {
            var now = DateTime.UtcNow;

            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Consultations ON");
            context.Consultations.AddRange(
                new Consultation
                {
                    Id = 1,
                    CaseFileId = 1,
                    Date = now,
                    Number = 1,
                    PractitionerId = 1,
                    SubjectiveId = 1,
                    ObjectiveId = 1,
                    Treatments = "L1-5 PA mobs. Each level 3 x 20sec. grade 2 comfortable. easied into grade 3 by 3rd set"
                        + "\nTrA activation - 5x5sec"
                        + "\nHip Flexor stretch - 3x15sec. kneel on pillow"
                        + "\nPlank 3x20sec",
                    Plans = "rv by end of week. ease into hydrotherapy when able"
                },
                new Consultation
                {
                    Id = 2,
                    CaseFileId = 2,
                    Date = now,
                    Number = 1,
                    PractitionerId = 1,
                    SubjectiveId = 2,
                    ObjectiveId = 2,
                    Treatments = "glut, quad and hamstring contractions. 3x10. short of pain"
                        + "\ncompression bandage, 1x med size"
                        + "\nleft knee distractions. 2x30sec in sitting"
                        + "\nelevated I/T compression with ice pack. 5 min",
                    Plans = "rv daily this week. gradual increase strength and reduce swelling."
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Consultations OFF");
        }       

        private static void AddSubjectiveAssessments(RecauraDbContext context)
        {
            var now = DateTime.UtcNow;

            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.SubjectiveAssessments ON");
            context.SubjectiveAssessments.AddRange(
                new SubjectiveAssessment
                {
                    Id = 1,
                    ConsultationId = 1,
                    MOI = "stood up quickly from sitting",
                    CurrentHistory = "went to stand up at the end of the work yesterday and immediate pain show in lower back down to calf.",
                    BodyChart = "www.physiocharts.com/msk/123.jpg",
                    AggravatingFactors = "predominantly forward flex motions. sometimes some turning motions, long sitting, long standing",
                    EasingFactors = "resting, hot shower, ice pack, sitting when standing, standing when sitting",
                    VAS = 5,
                    PastHistory = "had small aches in lower back in past but nothing as severe",
                    SocialHistory = "gym on and off. spends some time developing at home otherwise relaxes and watches netflix if not out with friends",
                    Imaging = "no xrays",
                    GeneralHealth = "nil"
                },
                new SubjectiveAssessment
                {
                    Id = 2,
                    ConsultationId = 2,
                    MOI = "Changed direction to run back towards middle of court and knee gave way",
                    CurrentHistory = "Playing in a local tournament.",
                    BodyChart = "www.physiocharts.com/msk/345.jpg",
                    AggravatingFactors = "walking long periods, running, completely straight knee",
                    EasingFactors = "rest, ice pack, flexed knee, compression",
                    VAS = 4,
                    PastHistory = "nil for left knee. right knee had acl tear as a teen 3 years ago",
                    SocialHistory = "trains 5-6x a week. jogs daily.",
                    Imaging = "MRI - moderate meniscal tear",
                    GeneralHealth = "nil"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.SubjectiveAssessments OFF");
        }

        private static void AddObjectiveAssessments(RecauraDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ObjectiveAssessments ON");
            context.ObjectiveAssessments.AddRange(
                new ObjectiveAssessment
                {
                    Id = 1,
                    ConsultationId = 1,
                    Observation = "cautious movements. slow sit to stand.",
                    Active = "Standing flexion -fingertips to 1/2 thigh",
                    Passive = "",
                    ResistedIsometric = "knee ext 4+/5",
                    FunctionalTests = "STS x10. pain at 7",
                    NeurologicalTests = "sensation testing thigh and calf. -ve",
                    SpecialTests = "",
                    Palpation = "Slight tenderness in right lower back",
                    Additional = "poor posture"
                },
                new ObjectiveAssessment
                {
                    Id = 2,
                    ConsultationId = 2,
                    Observation = "swollen left knee. mild limp when walking",
                    Active = "L knee ext - 20 deg from full ext",
                    Passive = "L knee ext 15 from full ext",
                    ResistedIsometric = "knee ext 4/5",
                    FunctionalTests = "step up x10. unable without arm assist. pain with arm assist",
                    NeurologicalTests = "",
                    SpecialTests = "lachmans -ve. mcmurrays +ve",
                    Palpation = "Slight tenderness in all around knee. most tender medial knee joint line"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ObjectiveAssessments OFF");
        }
    }
}
