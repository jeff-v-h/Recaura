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
        public int Id { get; set; }

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
                    .Include(o => o.Active)
                    .Include(o => o.Passive)
                    .Include(o => o.ResistedIsometric)
                    .Include(o => o.FunctionalTests)
                    .Include(o => o.NeurologicalTests)
                    .Include(o => o.SpecialTests)
                    .Where(o => o.Id == query.Id)
                    .FirstOrNotFoundAsync(nameof(ObjectiveAssessment), query.Id, token);

                return _mapper.Map<GetObjectiveAssessmentVm>(objective);
            }
        }
    }
}
