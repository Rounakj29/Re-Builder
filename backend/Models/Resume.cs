namespace backend.Models
{
    public class Resume
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }

        public List<Experience>? Experiences { get; set; }
        public List<Education>? Educations { get; set; }
        public List<Project>? Projects { get; set; }
        public List<Skill>? Skills { get; set; }
        public List<Certification>? Certifications { get; set; }
        public List<Language>? Languages { get; set; }
        public ContactInfo? ContactInfo { get; set; }
        public List<SocialLink>? SocialLinks { get; set; }
    }



}
