using AutoMapper;
using Recaura.Application.Common.Models;
using Recaura.Application.Features.CaseFiles.GetCasefile;
using Recaura.Application.Features.Consultations.GetConsultation;
using Recaura.Application.Features.ObjectiveAx.GetObjectiveAssessment;
using Recaura.Application.Features.Patients.GetPatient;
using Recaura.Application.Features.Patients.GetPatients;
using Recaura.Application.Features.SubjectiveAx.GetSubjectiveAssessment;
using Recaura.Domain.Entities;
using System.Collections.Generic;

namespace Recaura.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<List<Patient>, GetPatientsVm>()
                .ForMember(d => d.Patients, opt => opt.MapFrom(s => s));
            CreateMap<Patient, PatientVm>();

            CreateMap<Patient, GetPatientVm>();
            CreateMap<CaseFile, PatientCaseFileVm>();

            CreateMap<CaseFile, GetCaseFileVm>();
            CreateMap<Consultation, ConsultVm>();
            CreateMap<Patient, FilesPatientVm>();

            CreateMap<Consultation, GetConsultationVm>();
            CreateMap<Practitioner, PractitionerVm>();
            CreateMap<SubjectiveAssessment, SubjectiveAssessmentVm>();
            CreateMap<SubjectiveAssessmentVm, SubjectiveAssessment>()
                .ForMember(d => d.Consultation, opt => opt.Ignore());
            CreateMap<ObjectiveAssessment, ObjectiveAssessmentVm>();
            CreateMap<ObjectiveAssessmentVm, ObjectiveAssessment>()
                .ForMember(d => d.Consultation, opt => opt.Ignore());

            CreateMap<SubjectiveAssessment, GetSubjectiveAssessmentVm>();

            CreateMap<ObjectiveAssessment, GetObjectiveAssessmentVm>();
        }
    }
}
