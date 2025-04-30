using Microsoft.AspNetCore.Mvc;
using LeadsManagementAPI.Data;

namespace LeadsManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly LeadsDbContext _context;

        public LeadsController(LeadsDbContext context)
        {
            _context = context;
        }

        [HttpGet("invited")]
        public IActionResult GetInvitedLeads()
        {
            var leads = _context.Leads.Where(l => l.Status == "Invited").ToList();
            return Ok(leads);
        }

        [HttpPost("accept/{id}")]
        public IActionResult AcceptLead(int id)
        {
            var lead = _context.Leads.Find(id);
            if (lead == null) return NotFound();

            if (lead.Price > 500)
            {
                lead.Price *= 0.9m; 
            }

            lead.Status = "Accepted";
            _context.SaveChanges();

            System.IO.File.WriteAllText("email-log.txt", $"Lead {id} aceito.");

            return Ok(lead);
        }

        [HttpPost("decline/{id}")]
        public IActionResult DeclineLead(int id)
        {
            var lead = _context.Leads.Find(id);
            if (lead == null) return NotFound();

            lead.Status = "Declined";
            _context.SaveChanges();

            return Ok(lead);
        }

        [HttpGet("accepted")]
        public IActionResult GetAcceptedLeads()
        {
            var leads = _context.Leads.Where(l => l.Status == "Accepted").ToList();
            return Ok(leads);
        }
    }
}