namespace backend.Models
{
    public class Experience
    {
        public int Id { get; set; }
        public string? Company { get; set; }
        public string? Role { get; set; }
        public string? Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; } // null = Present
        public string? Description { get; set; }
        public List<string>? Technologies { get; set; } // optional
    }


}