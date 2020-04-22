using AutoMapper;

namespace Recaura.Application.Common.Mappings
{
    public interface IMapTo<T>
    {
        void ReverseMapping(Profile profile) => profile.CreateMap(GetType(), typeof(T));
    }
}
