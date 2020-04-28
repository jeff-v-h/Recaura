using AutoMapper;
using Recaura.Application.Common.Extensions;
using Recaura.Application.Common.Interfaces.Persistence;
using Recaura.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Recaura.Application.Features.Patients.GetPatient
{
    public class GetPatientQuery : IRequest<GetPatientVm>
    {
        public int Id { get; set; }

        public class GetPatientQueryHandler : IRequestHandler<GetPatientQuery, GetPatientVm>
        {
            private readonly IRecauraDbContext _dbContext;
            private readonly IMapper _mapper;

            public GetPatientQueryHandler(IRecauraDbContext context, IMapper mapper)
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
