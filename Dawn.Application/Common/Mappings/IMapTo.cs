using AutoMapper;

namespace Dawn.Application.Common.Mappings
{
    public interface IMapTo<T>
    {
        void ReverseMapping(Profile profile) => profile.CreateMap(GetType(), typeof(T));
    }
}
