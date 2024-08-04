using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Contexts;
using Models;
using Helpers;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Scores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Score>>> GetScores()
        {
            return await _context.Scores
                .Include(s => s.Chart)
                .ToListAsync();
        }

        // GET: api/Scores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Score>> GetScoreById(int id)
        {
            var score = await _context.Scores
                .Include(s => s.Chart)
                .FirstOrDefaultAsync(s => s.ScoreId == id);

            if (score == null)
            {
                return NotFound();
            }

            return score;
        }

        // PUT: api/Scores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateScore(int id, [FromBody] UpdateScoreRequest request)
        {
            if (id != request.ScoreId)
            {
                return BadRequest();
            }

            // get score to update
            var score = await _context.Scores.FindAsync(id);
            if (score == null) 
            {
                return NotFound();
            }

            // update score
            score.Accuracy = request.Accuracy;
            score.ScoreRating = request.ScoreRating;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Scores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ScoreResponse>> PostScore([FromBody] CreateScoreRequest request)
        {
            var chart = await _context.Charts.FindAsync(request.ChartId);
            if (chart == null)
            {
                return NotFound(new { Message = "Chart not found" });
            }

            var score = new Score
            {
                ChartId = request.ChartId,
                Accuracy = request.Accuracy,
                ScoreRating = request.ScoreRating,
                Chart = chart
            };

            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

            var response = new ScoreResponse
            {
                ScoreId = score.ScoreId,
                ChartId = score.ChartId,
                Accuracy = score.Accuracy,
                ScoreRating = score.ScoreRating,
                Chart = chart
            };

            return CreatedAtAction(nameof(GetScoreById), new { id = score.ScoreId }, response);
        }

        // DELETE: api/Scores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore(int id)
        {
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            _context.Scores.Remove(score);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScoreExists(int id)
        {
            return _context.Scores.Any(e => e.ScoreId == id);
        }
    }
}
