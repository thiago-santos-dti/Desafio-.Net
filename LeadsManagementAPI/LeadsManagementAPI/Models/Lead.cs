using System.ComponentModel.DataAnnotations.Schema;

namespace LeadsManagementAPI.Models
{
    public class Lead
    {
        public int ID { get; set; }
        public string FirstName { get; set; } = string.Empty; 
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; } = DateTime.Now; 
        public string Suburb { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } = 0; 
        public string Status { get; set; } = "Invited";
    }
}