using AutoMapper;
using Dawn.Application.Common.Interfaces.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Dawn.Application.Features.Patients.Queries.GetPatients
{
    public class GetPatientsQuery : IRequest<GetPatientsVm>
    {
        public class GetPatientQueryHandler : IRequestHandler<GetPatientsQuery, GetPatientsVm>
        {
            private readonly IDawnDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetPatientQueryHandler(IDawnDbContext context, IMapper mapper)
            {
                _dbContext = context;
                _mapper = mapper;
            }

            public async Task<GetPatientsVm> Handle(GetPatientsQuery query, CancellationToken token)
            {
                var patients = await _dbContext.Patients
                    .AsNoTracking()
                    .Include(p => p.CaseFiles)
                    .ToListAsync(token);

                return _mapper.Map<GetPatientsVm>(patients);
            }
        }
    }
}
