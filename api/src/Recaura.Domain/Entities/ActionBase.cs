namespace Recaura.Domain.Entities
{
    public abstract class ActionBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
    }
}
