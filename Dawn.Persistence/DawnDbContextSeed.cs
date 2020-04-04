using Dawn.Domain.Entities;
using Dawn.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
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

                context.Patients.AddRange(
                    new Patient
                    {
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
            }
        }
    }
}
