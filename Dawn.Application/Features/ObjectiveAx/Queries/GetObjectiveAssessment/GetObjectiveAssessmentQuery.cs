using AutoMapper;
using Dawn.Application.Common.Extensions;
using Dawn.Application.Common.Interfaces.Persistence;
using Dawn.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.ObjectiveAx.Queries.GetObjectiveAssessment
{
    public class GetObjectiveAssessmentQuery : IRequest<GetObjectiveAssessmentVm>
    {
        public int ConsultationId { get; set; }

        public class GetObjectiveAssessmentQueryHandler : IRequestHandler<GetObjectiveAssessmentQuery, GetObjectiveAssessmentVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetObjectiveAssessmentQueryHandler(IDawnDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetObjectiveAssessmentVm> Handle(GetObjectiveAssessmentQuery query, CancellationToken token)
            {
                var objective = await _dbContext.ObjectiveAssessments.AsNoTracking()
                    .Where(o => o.ConsultationId == query.ConsultationId)
                    .FirstOrNotFoundAsync(nameof(ObjectiveAssessment), $"ConsultationId {query.ConsultationId}", token);

                return _mapper.Map<GetObjectiveAssessmentVm>(objective);
            }
        }
    }
}
