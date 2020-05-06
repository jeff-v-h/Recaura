using AutoMapper;
using Recaura.Application.Common.Extensions;
using Recaura.Application.Common.Interfaces.Persistence;
using Recaura.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Recaura.Application.Features.SubjectiveAx.GetSubjectiveAssessment
{
    public class GetSubjectiveAssessmentQuery : IRequest<GetSubjectiveAssessmentVm>
    {
        public int ConsultationId { get; set; }

        public class GetSubjectiveAssessmentQueryHandler : IRequestHandler<GetSubjectiveAssessmentQuery, GetSubjectiveAssessmentVm>
        {
            private readonly IRecauraDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetSubjectiveAssessmentQueryHandler(IRecauraDbContext context, IMapper mapper)
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
