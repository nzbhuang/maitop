namespace Models
{
    public class Score
    {
        public int ScoreId { get; set; }
        public int ChartId { get; set; }
        public double Accuracy { get; set; }
        public int ScoreRating { get; set; }
        
        public required Chart Chart { get; set; }
    }
}
