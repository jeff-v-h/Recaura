using System.Collections.Generic;

namespace Dawn.Domain.Entities
{
    public class Patient : Person
    {
        public string Occupation { get; set; }
        public List<CaseFile> CaseFiles { get; set; }
    }
}
