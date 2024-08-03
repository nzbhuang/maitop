using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class Chart
    {
        public int ChartId { get; private set; }
        public required string Song { get; init; } // init: read only property
        public required string Type { get; init; }
        public required string Difficulty { get; init; }
        public required string InternalLevel { get; init; }
        public int New { get; init; }

        // Constructor to set the read only properties
        public Chart(int chartId, string song, string type, string difficulty, string internalLevel)
        {
            ChartId = chartId;
            Song = song;
            Type = type;
            Difficulty = difficulty;
            InternalLevel = internalLevel;
        }

    }
}