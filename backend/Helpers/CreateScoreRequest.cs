namespace Helpers
{
    public class CreateScoreRequest
    {
        public int ChartId { get; set; }
        public double Accuracy { get; set; }
        public int ScoreRating { get; set; }
    }
}