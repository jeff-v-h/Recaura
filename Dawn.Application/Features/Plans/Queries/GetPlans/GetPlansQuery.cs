using AutoMapper;
using AutoMapper.QueryableExtensions;
using Dawn.Application.Common.Interfaces.Persistence;
using Dawn.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.Plans.Queries.GetPlans
{
    public class GetPlansQuery : IRequest<GetPlansVm>
    {
        public int ConsultationId { get; set; }

        public class GetPlansQueryHandler : IRequestHandler<GetPlansQuery, GetPlansVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetPlansQueryHandler(IDawnDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetPlansVm> Handle(GetPlansQuery query, CancellationToken token)
            {
                var vm = new GetPlansVm
                {
                    ConsultationId = query.ConsultationId
                };

                vm.Plans = await _dbContext.ForwardPlans.AsNoTracking()
                    .ProjectTo<ForwardPlanVm>(_mapper.ConfigurationProvider)
                    .Where(c => c.ConsultationId == query.ConsultationId)
                    .ToListAsync();

                return vm;
            }
        }
    }
}
