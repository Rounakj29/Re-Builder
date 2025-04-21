namespace backend.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; } // e.g., Backend, Frontend, Tools
        public string Proficiency { get; set; } // Beginner, Intermediate, Expert
    }
}


