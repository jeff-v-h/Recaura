using AutoMapper;
using Recaura.Application.Common.Extensions;
using Recaura.Application.Common.Interfaces.Persistence;
using Recaura.Application.Common.Models;
using Recaura.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Recaura.Application.Features.Consultations.UpdateConsultation
{
    public class UpdateConsultationCommand : IRequest
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public PractitionerVm? Practitioner { get; set; }
        public SubjectiveAssessmentVm? SubjectiveAssessment { get; set; }
        public ObjectiveAssessmentVm? ObjectiveAssessment { get; set; }
        public string Treatments { get; set; }
        public string Plans { get; set; }

        public class UpdateConsultationCommandHandler : IRequestHandler<UpdateConsultationCommand>
        {
            private readonly IRecauraDbContext _dbContext;
            private readonly IMapper _mapper;

            public UpdateConsultationCommandHandler(IRecauraDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(UpdateConsultationCommand command, CancellationToken cancelToken)
            {
                var consultation = await _dbContext.Consultations.AsNoTracking()
                    .Where(c => c.Id == command.Id)
                    .FirstOrNotFoundAsync(nameof(Consultation), command.Id, cancelToken);
                
                consultation.Date = command.Date;
                consultation.Number = command.Number;
                if (consultation.Practitioner != null)
                {
                    consultation.PractitionerId = command.Practitioner.Id;
                }

                if (command.SubjectiveAssessment != null)
                {
                    consultation.SubjectiveAssessment = _mapper.Map<SubjectiveAssessment>(command.SubjectiveAssessment);
                }

                if (command.ObjectiveAssessment != null)
                {
                    consultation.ObjectiveAssessment = _mapper.Map<ObjectiveAssessment>(command.ObjectiveAssessment);
                }

                // Objective changed here
                consultation.Treatments = command.Treatments;
                consultation.Plans = command.Plans;

                _dbContext.Consultations.Update(consultation);
                await _dbContext.SaveChangesAsync(cancelToken);

                return Unit.Value;
            }
        }
    }
}
