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
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.Users
                .Include(u => u.Scores)
                .ThenInclude(s => s.Chart)
                .ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _context.Users
                .Include(u => u.Scores)
                .ThenInclude(s => s.Chart)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Users/by-username/Username5
        [HttpGet("by-username/{username}")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET api/Users/{userId}/scores
        [HttpGet("{id}/scores")]
        public async Task<ActionResult<IEnumerable<Score>>> GetUserScores(int id)
        {
            var user = await _context.Users
                .Include(u => u.Scores)
                .ThenInclude(s => s.Chart)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Scores);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserRating(int id, UpdateUserRatingRequest request)
        {
            if (id != request.UserId)
            {
                return BadRequest();
            }

            // get user
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // update user
            user.Rating = request.Rating;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserResponse>> CreateUser([FromBody] CreateUserRequest request)
        {
            var user = new User
            {
                Username = request.Username,
                Rating = 0
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var response = new User
            {
                UserId = user.UserId,
                Username = user.Username,
                Rating = 0
            };

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, response);
        }

        // POST: api/Users/add-score
        [HttpPost("add-score")]
        public async Task<IActionResult> AddScore([FromBody] AddScoreToUserRequest request)
        {
            var user = await _context.Users
                .Include(u => u.Scores)
                .FirstOrDefaultAsync(u => u.UserId == request.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var score = await _context.Scores
                .FirstOrDefaultAsync(s => s.ScoreId == request.ScoreId);
            if (score == null)
            {
                return NotFound("Score not found");
            }

            user.Scores.Add(score);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
