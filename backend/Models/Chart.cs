using Microsoft.EntityFrameworkCore;

namespace Models 
{
    public class Chart 
    {
        public int Id { get; set; }
        public required string Song { get; set; }
        public required string Type { get; set; }
        public required string Difficulty { get; set; }
        public required string InternalLevel { get; set; }
        public int? New { get; set; }
         
    }
}