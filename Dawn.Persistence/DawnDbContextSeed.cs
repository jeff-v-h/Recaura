using Dawn.Domain.Entities;
using Dawn.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dawn.Persistence
{
    public static class DawnDbContextSeed
    {
        public static void Initialise(IServiceProvider serviceProvider)
        {
            using (var context = new DawnDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<DawnDbContext>>()))
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
                    AddActiveTests(context);
                    AddPassiveTests(context);
                    AddResistedIsometricTests(context);
                    AddFunctionalTests(context);
                    AddNeurologicalTests(context);
                    AddSpecialTests(context);
                    AddTreatments(context);
                    AddForwardPlans(context);
                }
                finally
                {
                    context.Database.CloseConnection();
                }
            }
        }

        private static void AddPatients(DawnDbContext context)
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

        private static void AddPractitioners(DawnDbContext context)
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

        private static void AddCaseFiles(DawnDbContext context)
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

        private static void AddConsultations(DawnDbContext context)
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
                    ObjectiveId = 1
                },
                new Consultation
                {
                    Id = 2,
                    CaseFileId = 2,
                    Date = now,
                    Number = 1,
                    PractitionerId = 1,
                    SubjectiveId = 2,
                    ObjectiveId = 2
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Consultations OFF");
        }       

        private static void AddSubjectiveAssessments(DawnDbContext context)
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

        private static void AddObjectiveAssessments(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ObjectiveAssessments ON");
            context.ObjectiveAssessments.AddRange(
                new ObjectiveAssessment
                {
                    Id = 1,
                    ConsultationId = 1,
                    Observation = "cautious movements. slow sit to stand.",
                    Palpation = "Slight tenderness in right lower back",
                    Additional = "poor posture"
                },
                new ObjectiveAssessment
                {
                    Id = 2,
                    ConsultationId = 2,
                    Observation = "swollen left knee. mild limp when walking",
                    Palpation = "Slight tenderness in all around knee. most tender medial knee joint line"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ObjectiveAssessments OFF");
        }

        private static void AddActiveTests(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ActiveTests ON");
            context.ActiveTests.AddRange(
                new ActiveTest
                {
                    Id = 1,
                    ObjectiveAssessmentId = 1,
                    Name = "Standing Flexion",
                    Value = 0,
                    Comment = "to 1/2 thigh"
                },
                new ActiveTest
                {
                    Id = 2,
                    ObjectiveAssessmentId = 2,
                    Name = "L knee ext",
                    Value = 20,
                    Comment = "from full ext"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ActiveTests OFF");
        }

        private static void AddPassiveTests(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.PassiveTests ON");
            context.PassiveTests.Add(new PassiveTest
            {
                Id = 1,
                ObjectiveAssessmentId = 2,
                Name = "L knee ext",
                Value = 15,
                Comment = "from full ext"
            });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.PassiveTests OFF");
        }

        private static void AddResistedIsometricTests(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ResistedIsometricTests ON");
            context.ResistedIsometricTests.AddRange(
                new ResistedIsometricTest
                {
                    Id = 1,
                    ObjectiveAssessmentId = 1,
                    Name = "Knee Extension",
                    Value = 4,
                    Comment = "4+/5"
                },
                new ResistedIsometricTest
                {
                    Id = 2,
                    ObjectiveAssessmentId = 2,
                    Name = "L knee ext",
                    Value = 4
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ResistedIsometricTests OFF");
        }

        private static void AddFunctionalTests(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.FunctionalTests ON");
            context.FunctionalTests.AddRange(
                new FunctionalTest
                {
                    Id = 1,
                    ObjectiveAssessmentId = 1,
                    Name = "Sit to stand x10",
                    Result = "Stopped at 7",
                    Comment = "pain initially. increased from 4. too much by 7"
                },
                new FunctionalTest
                {
                    Id = 2,
                    ObjectiveAssessmentId = 2,
                    Name = "step up x10",
                    Result = "unable without arm assist",
                    Comment = "able with arm assist but still with pain+"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.FunctionalTests OFF");
        }

        private static void AddNeurologicalTests(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.NeurologicalTests ON");
            context.NeurologicalTests.Add(new NeurologicalTest
            {
                Id = 1,
                ObjectiveAssessmentId = 1,
                Name = "Sensation",
                Result = DiagnosticResult.Negative
            });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.NeurologicalTests OFF");
        }

        private static void AddSpecialTests(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.SpecialTests ON");
            context.SpecialTests.AddRange(
                new SpecialTest
                {
                    Id = 1,
                    ObjectiveAssessmentId = 2,
                    Name = "Lachman's Test",
                    Result = DiagnosticResult.Negative
                },
                new SpecialTest
                {
                    Id = 2,
                    ObjectiveAssessmentId = 2,
                    Name = "McMurray's Test",
                    Result = DiagnosticResult.Positive,
                    Comment = "more pain medial side"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.SpecialTests OFF");
        }

        private static void AddTreatments(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Treatments ON");
            context.Treatments.AddRange(
                new Treatment
                {
                    Id = 1,
                    ConsultationId = 1,
                    Name = "L1-5 PA mobs",
                    Quantity = "Each 3 x 20sec",
                    Comment = "grade 2 comfortable. easied into grade 3 by 3rd set"
                },
                new Treatment
                {
                    Id = 2,
                    ConsultationId = 1,
                    Name = "TrA activation",
                    Quantity = "5x5sec"
                },
                new Treatment
                {
                    Id = 3,
                    ConsultationId = 1,
                    Name = "Hip Flexor stretch",
                    Quantity = "3x15sec",
                    Comment = "kneel on pillow"
                },
                new Treatment
                {
                    Id = 4,
                    ConsultationId = 1,
                    Name = "Plank",
                    Quantity = "3x 30sec"
                },
                new Treatment
                {
                    Id = 5,
                    ConsultationId = 2,
                    Name = "glut, quad and hamstring contractions",
                    Quantity = "3x10",
                    Comment = "short of pain"
                },
                new Treatment
                {
                    Id = 6,
                    ConsultationId = 2,
                    Name = "compression bandage",
                    Quantity = "1x med size"
                },
                new Treatment
                {
                    Id = 7,
                    ConsultationId = 2,
                    Name = "left knee distractions",
                    Quantity = "2x30sec",
                    Comment = "in sitting"
                },
                new Treatment
                {
                    Id = 8,
                    ConsultationId = 2,
                    Name = "elevated I/T compression with ice pack",
                    Quantity = "5 min"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Treatments OFF");
        }

        private static void AddForwardPlans(DawnDbContext context)
        {
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ForwardPlans ON");
            context.ForwardPlans.AddRange(
                new ForwardPlan
                {
                    Id = 1,
                    ConsultationId = 1,
                    Name = "strengthen core gradually"
                },
                new ForwardPlan
                {
                    Id = 2,
                    ConsultationId = 1,
                    Name = "Review tomorrow"
                },
                new ForwardPlan
                {
                    Id = 3,
                    ConsultationId = 2,
                    Name = "aqua exs in 2 days"
                },
                new ForwardPlan
                {
                    Id = 4,
                    ConsultationId = 2,
                    Name = "Review daily this week"
                });
            context.SaveChanges();
            context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.ForwardPlans OFF");
        }
    }
}
