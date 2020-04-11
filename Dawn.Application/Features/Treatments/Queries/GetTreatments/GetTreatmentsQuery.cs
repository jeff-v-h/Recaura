using AutoMapper;
using AutoMapper.QueryableExtensions;
using Dawn.Application.Common.Interfaces.Persistence;
using Dawn.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.Treatments.Queries.GetTreatments
{
    public class GetTreatmentsQuery : IRequest<GetTreatmentsVm>
    {
        public int ConsultationId { get; set; }

        public class GetTreatmentsQueryHandler : IRequestHandler<GetTreatmentsQuery, GetTreatmentsVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetTreatmentsQueryHandler(IDawnDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetTreatmentsVm> Handle(GetTreatmentsQuery query, CancellationToken token)
            {
                var vm = new GetTreatmentsVm
                {
                    ConsultationId = query.ConsultationId
                };

                vm.Treatments = await _dbContext.Treatments.AsNoTracking()
                    .ProjectTo<TreatmentVm>(_mapper.ConfigurationProvider)
                    .Where(c => c.ConsultationId == query.ConsultationId)
                    .ToListAsync();

                return vm;
            }
        }
    }
}
