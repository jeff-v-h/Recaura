using AutoMapper;
using Recaura.Application.Common.Extensions;
using Recaura.Application.Common.Interfaces.Persistence;
using Recaura.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Recaura.Application.Features.Consultations.GetConsultation
{
    public class GetConsultationQuery : IRequest<GetConsultationVm>
    {
        public int Id { get; set; }

        public class GetConsultationQueryHandler : IRequestHandler<GetConsultationQuery, GetConsultationVm>
        {
            private readonly IRecauraDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetConsultationQueryHandler(IRecauraDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetConsultationVm> Handle(GetConsultationQuery query, CancellationToken token)
            {
                var consultation = await _dbContext.Consultations.AsNoTracking()
                    .Include(c => c.Practitioner)
                    .Include(c => c.SubjectiveAssessment)
                    .Include(c => c.ObjectiveAssessment)
                    .Where(c => c.Id == query.Id)
                    .FirstOrNotFoundAsync(nameof(Consultation), query.Id, token);

                return _mapper.Map<GetConsultationVm>(consultation);
            }
        }
    }
}
