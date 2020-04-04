using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Dawn.Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Dawn.Application.Common.Extensions
{
    public static class QueryableExtensions
    {
        /// <summary>
        /// Asynchronously returns the first element of a sequence, or throws a NotFoundException if one does
        /// not exist.
        /// </summary>
        public static async Task<T> FirstOrNotFoundAsync<T>(this IQueryable<T> source, string resourceName, object key,
            CancellationToken cancellationToken)
        {
            var result = await source.FirstOrDefaultAsync(cancellationToken);
            if (result == null || result.Equals(default(T)!))
            {
                throw new NotFoundException(resourceName, key);
            }
            return result;
        }


        public static async Task<T> FirstOrNotFoundAsync<T>(
            this IQueryable<T> source,
            Expression<Func<T, bool>> predicate,
            string resourceName,
            object key,
            CancellationToken cancellationToken)
        {
            var result = await source.FirstOrDefaultAsync(predicate, cancellationToken);

            if (result == null || result.Equals(default(T)!))
            {
                throw new NotFoundException(resourceName, key);
            }

            return result;
        }
    }
}
