namespace Models
{
    public class User
    {
        public int UserId {  get; set; }
        public required string Username { get; set; }
        public required int Rating { get; set; }

        public ICollection<Score> Scores { get; set; } = new List<Score>();
    }
}
