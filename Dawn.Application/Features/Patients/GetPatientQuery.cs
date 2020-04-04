using Dawn.Application.Interfaces.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dawn.Application.Features.Patients
{
    public class GetPatientQuery : IRequest<GetPatientVm>
    {
        public int Id { get; set; }

        public class GetPatientQueryHandler : IRequestHandler<GetPatientQuery, GetPatientVm>
        {
            private readonly IDawnDbContext _dbContext;
            //private readonly IMapper _mapper;

            public GetPatientQueryHandler(IDawnDbContext context)
            {
                _dbContext = context;
            }
        }
    }
}
