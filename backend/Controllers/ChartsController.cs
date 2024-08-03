using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Contexts;
using Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private readonly ChartsDbContext _context;

        public ChartsController(ChartsDbContext context)
        {
            _context = context;
        }

        // GET: api/Charts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chart>>> GetCharts()
        {
            return await _context.Charts.ToListAsync();
        }

        // GET: api/Charts/5
        [HttpGet("{chartId}")]
        public async Task<ActionResult<Chart>> GetChart(int chartId)
        {
            var chart = await _context.Charts.FindAsync(chartId);

            if (chart == null)
            {
                return NotFound();
            }

            return chart;
        }

        private bool ChartExists(int chartId)
        {
            return _context.Charts.Any(e => e.ChartId == chartId);
        }
    }
}
