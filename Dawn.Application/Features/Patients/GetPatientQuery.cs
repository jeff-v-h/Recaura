using AutoMapper;
using Dawn.Application.Common.Extensions;
using Dawn.Application.Common.Interfaces.Persistence;
using Dawn.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.Patients
{
    public class GetPatientQuery : IRequest<GetPatientVm>
    {
        public int Id { get; set; }

        public class GetPatientQueryHandler : IRequestHandler<GetPatientQuery, GetPatientVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetPatientQueryHandler(IDawnDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetPatientVm> Handle(GetPatientQuery query, CancellationToken token)
            {
                var patient = await _dbContext.Patients
                    .AsNoTracking()
                    .Include(p => p.CaseFiles)
                    .Where(p => p.Id == query.Id)
                    .FirstOrNotFoundAsync(nameof(Patient), query.Id, token);

                return _mapper.Map<GetPatientVm>(patient);
            }
        }
    }
}
