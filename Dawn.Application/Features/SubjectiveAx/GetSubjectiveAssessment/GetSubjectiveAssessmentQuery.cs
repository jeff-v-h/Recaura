using AutoMapper;
using Dawn.Application.Common.Extensions;
using Dawn.Application.Common.Interfaces.Persistence;
using Dawn.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.SubjectiveAx.GetSubjectiveAssessment
{
    public class GetSubjectiveAssessmentQuery : IRequest<GetSubjectiveAssessmentVm>
    {
        public int ConsultationId { get; set; }

        public class GetSubjectiveAssessmentQueryHandler : IRequestHandler<GetSubjectiveAssessmentQuery, GetSubjectiveAssessmentVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetSubjectiveAssessmentQueryHandler(IDawnDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetSubjectiveAssessmentVm> Handle(GetSubjectiveAssessmentQuery query, CancellationToken token)
            {
                var subjective = await _dbContext.SubjectiveAssessments.AsNoTracking()
                    .Where(s => s.ConsultationId == query.ConsultationId)
                    .FirstOrNotFoundAsync(nameof(SubjectiveAssessment), $"ConsultationId {query.ConsultationId}", token);

                return _mapper.Map<GetSubjectiveAssessmentVm>(subjective);
            }
        }
    }
}
