using Dawn.Application.Common.Mappings;
using Dawn.Domain.Entities;
using Dawn.Domain.Enums;
using System.Collections.Generic;

namespace Dawn.Application.Features.Common
{
    public class ObjectiveAssessmentVm : IMapFrom<ObjectiveAssessment>
    {
        public int Id { get; set; }
        public string Observation { get; set; }
        public IReadOnlyCollection<ActiveTestVm> Active { get; set; }
        public IReadOnlyCollection<PassiveTestVm> Passive { get; set; }
        public IReadOnlyCollection<ResistedIsometricTestVm> ResistedIsometric { get; set; }
        public IReadOnlyCollection<FunctionalTestVm> FunctionalTests { get; set; }
        public IReadOnlyCollection<NeurologicalTestVm> NeurologicalTests { get; set; }
        public IReadOnlyCollection<SpecialTestVm> SpecialTests { get; set; }
        public string Palpation { get; set; }
        public string Additional { get; set; }
    }

    public class ActiveTestVm : IMapFrom<ActiveTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public decimal Value { get; set; }
    }

    public class PassiveTestVm : IMapFrom<PassiveTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public decimal Value { get; set; }
    }

    public class ResistedIsometricTestVm : IMapFrom<ResistedIsometricTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public int Value { get; set; }
    }

    public class FunctionalTestVm : IMapFrom<FunctionalTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public string Result { get; set; }
    }

    public class NeurologicalTestVm : IMapFrom<NeurologicalTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DiagnosticResult Result { get; set; }
    }

    public class SpecialTestVm : IMapFrom<SpecialTest>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public DiagnosticResult Result { get; set; }
    }
}
