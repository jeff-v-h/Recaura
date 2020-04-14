using AutoMapper;
using Dawn.Application.Common.Extensions;
using Dawn.Application.Common.Interfaces.Persistence;
using Dawn.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.Consultations.Queries.GetConsultation
{
    public class GetConsultationQuery : IRequest<GetConsultationVm>
    {
        public int Id { get; set; }

        public class GetConsultationQueryHandler : IRequestHandler<GetConsultationQuery, GetConsultationVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetConsultationQueryHandler(IDawnDbContext context, IMapper mapper)
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
