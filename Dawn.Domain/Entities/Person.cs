using Dawn.Domain.Enums;
using System;

namespace Dawn.Domain.Entities
{
    public abstract class Person
    {
        public int Id { get; set; }
        public Honorific Honorific { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string CountryCode { get; set; }
        public string HomePhone { get; set; }
        public string MobilePhone { get; set; }
        public string Gender { get; set; }
    }
}
