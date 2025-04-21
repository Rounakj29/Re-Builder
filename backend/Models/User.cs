namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }

        public List<Resume> Resumes { get; set; }
    }

}
