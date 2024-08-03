namespace Models
{
    public class User
    {
        public int UserId {  get; set; }
        public required string Username { get; set; }
        public required int Rating { get; set; }

        public List<Score>? Scores { get; set; }
    }
}
